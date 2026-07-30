import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { NextRequest } from "next/server";
import { graph } from "@/app/agent";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Support both { message } and { messages } payload formats
        const messagesInput = body.messages || (body.message ? [{ role: "user", content: body.message }] : null);

        if (!messagesInput || !Array.isArray(messagesInput) || messagesInput.length === 0) {
            return new Response(JSON.stringify({ error: "Messages array or message string is required." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Convert frontend messages to LangChain message instances
        const formattedMessages = messagesInput.map((m: any) => {
            if (m.role === "user") {
                return new HumanMessage(typeof m.content === "string" ? m.content : JSON.stringify(m.content));
            } else {
                return new AIMessage(typeof m.content === "string" ? m.content : JSON.stringify(m.content || ""));
            }
        });

        const encoder = new TextEncoder();
        const customStream = new ReadableStream({
            async start(controller) {
                try {
                    // Stream messages from LangGraph
                    const eventStream = await graph.stream(
                        { messages: formattedMessages },
                        { streamMode: "messages" }
                    );

                    for await (const chunk of eventStream) {
                        let text = "";

                        if (Array.isArray(chunk)) {
                            const [message, metadata] = chunk;
                            
                            const isChatNode = !metadata?.langgraph_node || metadata.langgraph_node === "chat";
                            const isAIMessage = message?._getType?.() === "ai" || message?.constructor?.name?.includes("AI");

                            if (isChatNode && isAIMessage) {
                                const toolCalls = (message as any)?.tool_calls;
                                if (toolCalls && toolCalls.length > 0) {
                                    const names = toolCalls.map((t: any) => t.name).join(", ");
                                    text = `\n🔍 *[Using tool: ${names}...]*\n\n`;
                                } else if (message?.content) {
                                    if (typeof message.content === "string") {
                                        text = message.content;
                                    } else if (Array.isArray(message.content)) {
                                        text = message.content.map((part: any) => part.text || "").join("");
                                    }
                                }
                            }
                        } else if (chunk && typeof chunk === "object") {
                            const toolCalls = (chunk as any)?.tool_calls;
                            if (toolCalls && toolCalls.length > 0) {
                                const names = toolCalls.map((t: any) => t.name).join(", ");
                                text = `\n🔍 *[Using tool: ${names}...]*\n\n`;
                            } else if ((chunk as any).content && typeof (chunk as any).content === "string") {
                                text = (chunk as any).content;
                            }
                        }

                        if (text) {
                            controller.enqueue(encoder.encode(text));
                        }
                    }
                    controller.close();
                } catch (error) {
                    console.error("[Chat Stream Error]:", error);
                    controller.enqueue(encoder.encode("\n\n✏️ [Error generating response. Please try again.]"));
                    controller.close();
                }
            },
        });

        return new Response(customStream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Transfer-Encoding": "chunked",
                "Cache-Control": "no-cache, no-transform",
                "Connection": "keep-alive",
            },
        });
    } catch (error) {
        console.error("[Chat API Error]:", error);
        return new Response(JSON.stringify({ error: "Internal server error." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}