import { HumanMessage } from "@langchain/core/messages";
import { NextRequest, NextResponse } from "next/server";
import { graph } from "@/app/agent";

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();
        if (!message) {
            return NextResponse.json({
                error: "Message is required.",
            },{status: 400});
        }

        const result = await graph.invoke({
            messages: [
                new HumanMessage(message),
            ]
        });

        const response = result.messages.at(-1)?.content ?? "";
        return NextResponse.json({response});
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: "Something went wrong."},
            {status: 500}
        );
    }
}