import { NextResponse } from "next/server";

export async function POST(request: Request){
    const requestBody = await request.json();
    const id = requestBody?.id
    const role = requestBody?.role
    console.log(requestBody, id, role)
    return NextResponse.json(requestBody);
}
