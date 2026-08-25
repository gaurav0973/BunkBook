import { deleteWorkspaceForUser, getWorkspaceByIdForUser, updateWorkspaceForUser } from "@/server/workspace/services";
import { updateWorkspaceSchema, workspaceIdParamSchema } from "@/server/workspace/validators";
import { ValidationError } from "@/types/app-error";
import { getZodFieldErrors } from "@/types/zod-error";
import { NextRequest, NextResponse } from "next/server";

function parseWorkspaceId(params: unknown) {
    const parsed = workspaceIdParamSchema.safeParse(params);
    if (!parsed.success) {
        throw new ValidationError("Invalid workspace id", getZodFieldErrors(parsed.error));
    }
    return parsed.data;
}
function parseUpdateBody(body: unknown) {
    const parsed = updateWorkspaceSchema.safeParse(body);
    if (!parsed.success) {
        throw new ValidationError(
            "Validation failed",
            getZodFieldErrors(parsed.error),
        );
    }
    return parsed.data;
}

type RouteContext = {
    params: Promise<{ workspaceId?: string }>;
};


//1. get a workspace by id for a user
export async function GET(request: NextRequest, { params }: RouteContext){
    const { workspaceId } = parseWorkspaceId(await params);
    const requestBody = await request.json();
    const workspace = await getWorkspaceByIdForUser(
        workspaceId,
        requestBody?.session?.user?.id,
    );
    return NextResponse.json(workspace);
}


//2. update a workspace by id for a user
export async function PATCH(req: NextRequest, { params }: RouteContext){
    const { workspaceId } = parseWorkspaceId(await params);
    const requestBody = await req.json();
    const input = parseUpdateBody(requestBody);
    const workspace = await updateWorkspaceForUser(
        workspaceId,
        requestBody?.session?.user?.id,
        input,
    );
    return NextResponse.json(workspace);
}

// 3. delete a workspace by id for a user
export async function DELETE(req: NextRequest, { params }: RouteContext){
    const { workspaceId } = parseWorkspaceId(await params);
    const requestBody = await req.json();
    await deleteWorkspaceForUser(workspaceId, requestBody?.session?.user?.id);
    return NextResponse.json({ message: "Workspace deleted successfully" });
}


