import { deleteSourceForWorkspace, getSourceForWorkspace } from "@/server/source/services";
import { sourceIdParamSchema } from "@/server/source/validators";
import { ValidationError } from "@/types/app-error";
import { getZodFieldErrors } from "@/types/zod-error";
import { NextRequest, NextResponse } from "next/server";


// parcing
function parseSourceParams(params: unknown) {
    const parsed = sourceIdParamSchema.safeParse(params);
    if (!parsed.success) {
        throw new ValidationError(
            "Invalid source id",
            getZodFieldErrors(parsed.error),
        );
    }
    return parsed.data;
}


type RouteContext = {
    params: Promise<{ workspaceId?: string , sourceId?: string }>;
};


//1. get the source by id for a user
export async function GET(request: NextRequest, { params }: RouteContext){
    const { workspaceId, sourceId } = parseSourceParams(await params);
    const requestBody = await request.json();
    const source = await getSourceForWorkspace(
        workspaceId,
        sourceId,
        requestBody?.session?.user?.id
    );
    return NextResponse.json(source);
}

//2. delete the source by id for a user
export async function DELETE(request: NextRequest, { params }: RouteContext){
    const { workspaceId, sourceId } = parseSourceParams(await params);
    const requestBody = await request.json();
    await deleteSourceForWorkspace(
        workspaceId,
        sourceId,
        requestBody?.session?.user?.id,
    );
    return NextResponse.json({ message: "Source deleted successfully" });
}
