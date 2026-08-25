import { bulkDeleteSourcesForWorkspace } from "@/server/source/services";
import { bulkDeleteSourcesSchema } from "@/server/source/validators";
import { workspaceIdParamSchema } from "@/server/workspace/validators";
import { ValidationError } from "@/types/app-error";
import { getZodFieldErrors } from "@/types/zod-error";
import { NextRequest, NextResponse } from "next/server";

// parcing
function parseBulkDeleteBody(body: unknown) {
    const parsed = bulkDeleteSourcesSchema.safeParse(body);
    if (!parsed.success) {
        throw new ValidationError(
            "Validation failed",
            getZodFieldErrors(parsed.error),
        );
    }
    return parsed.data;
}
function parseWorkspaceId(params: unknown) {
    const parsed = workspaceIdParamSchema.safeParse(params);
    if (!parsed.success) {
        throw new ValidationError(
            "Invalid workspace id",
            getZodFieldErrors(parsed.error),
        );
    }
    return parsed.data;
}


type RouteContext = {
    params: Promise<{ workspaceId?: string }>;
};
export async function POST(request: NextRequest, { params }: RouteContext){
    const { workspaceId } = parseWorkspaceId(await params);
    const requestBody = await request.json();
    const input = parseBulkDeleteBody(requestBody);
    await bulkDeleteSourcesForWorkspace(
        workspaceId,
        requestBody?.session?.user?.id,
        input.sourceIds,
    );
    return NextResponse.json(null, { status: 204 });
}
