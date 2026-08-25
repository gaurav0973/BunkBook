import { createTextOrMarkdownSource, listSourcesForWorkspace } from "@/server/source/services";
import { createSourceSchema, listSourcesQuerySchema } from "@/server/source/validators";
import { workspaceIdParamSchema } from "@/server/workspace/validators";
import { ValidationError } from "@/types/app-error";
import { getZodFieldErrors } from "@/types/zod-error";
import { NextRequest, NextResponse } from "next/server";

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
function parseListQuery(query: unknown) {
    const parsed = listSourcesQuerySchema.safeParse(query);
    if (!parsed.success) {
        throw new ValidationError(
            "Invalid query parameters",
            getZodFieldErrors(parsed.error),
        );
    }
    return parsed.data;
}
function parseCreateBody(body: unknown) {
    const parsed = createSourceSchema.safeParse(body);
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
// 1. list all sources for a workspace
export async function GET(request: NextRequest, { params }: RouteContext){
    const { workspaceId } = parseWorkspaceId(await params);
    const requestBody = await request.json();

    // query params
    const searchParams = request.nextUrl.searchParams;
    const query = Object.fromEntries(searchParams.entries()); // Converts URLSearchParams to a plain object
    const filters = parseListQuery(query);
    const sources = await listSourcesForWorkspace(
        workspaceId,
        requestBody?.session?.user?.id,
        filters,
    );
    return NextResponse.json(sources);
}



// 2. create a new source for a workspace
export async function POST(request: NextRequest, { params }: RouteContext){
    const { workspaceId } = parseWorkspaceId(await params);
    const requestBody = await request.json();
    const input = parseCreateBody(requestBody);
    const source = await createTextOrMarkdownSource(
        workspaceId,
        requestBody?.session?.user?.id,
        input,
    );
    return NextResponse.json(source);
}
