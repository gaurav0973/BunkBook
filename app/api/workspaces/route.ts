import {
    createWorkspaceForUser,
    listWorkspacesByUser,
} from "@/server/workspace/services";
import { createWorkspaceSchema } from "@/server/workspace/validators";
import { ValidationError } from "@/types/app-error";
import { getZodFieldErrors } from "@/types/zod-error";
import { NextRequest, NextResponse } from "next/server";


function parseCreateBody(body: unknown) {
    const parsed = createWorkspaceSchema.safeParse(body);
    if (!parsed.success) {
        throw new ValidationError(
            "Validation failed",
            getZodFieldErrors(parsed.error),
        );
    }

    return parsed.data;
}
//1. list workspaces for a user
export async function GET(req: NextRequest) {
    const requestBody = await req.json();
    const userId = requestBody.session?.user?.id;
    const workspaces = await listWorkspacesByUser(userId);
    return NextResponse.json(workspaces);
}

//2. create a new workspace for a user
export async function POST(req: NextRequest) {
    const requestBody = await req.json();
    const input = parseCreateBody(requestBody);
    const workspace = await createWorkspaceForUser(
        requestBody.session?.user?.id,
        input,
    );
    return NextResponse.json(workspace);
}


