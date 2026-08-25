import { NextResponse } from "next/server";

type RouteContext = {
    params: Promise<{ id?: string }>;
};

export async function POST(request: Request, { params }: RouteContext) {
    const requestBody = await request.json();
    const resolvedParams = await params;
    console.log(resolvedParams);
    return NextResponse.json({
        body: requestBody,
        params: resolvedParams,
    });
}
