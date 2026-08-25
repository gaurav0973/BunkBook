import { importWebsiteSource } from "@/server/source/services";
import { importWebsiteSchema } from "@/server/source/validators";
import { workspaceIdParamSchema } from "@/server/workspace/validators";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
    params: Promise<{ workspaceId?: string }>;
};
export async function POST(request: NextRequest, { params }: RouteContext){
    const { workspaceId } = workspaceIdParamSchema.parse(await params);
    const requestBody = await request.json();
    const input = importWebsiteSchema.parse(requestBody);
    const source = await importWebsiteSource(
        workspaceId,
        requestBody?.session?.user?.id,
        input,
    );
    return NextResponse.json(source);
}
