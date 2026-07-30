import { AgentState } from "../state";

/**
 * Routes graph execution based on tool calls:
 * - yes => go to "tools" node
 * - no => go to "__end__" node
 */
export function toolsRouter(state: typeof AgentState.State) {
    const lastMessage = state.messages[state.messages.length - 1];
    
    const toolCalls = (lastMessage as any)?.tool_calls || (lastMessage as any)?.additional_kwargs?.tool_calls;

    if (lastMessage && toolCalls && toolCalls.length > 0) {
        console.log("🛠️ [Tools Router]: Tool call detected! Routing to 'tools' node ->", toolCalls.map((t: any) => t.name || t.function?.name));
        return "tools";
    }
    
    console.log("🏁 [Tools Router]: Final response completed. Routing to '__end__'.");
    return "__end__";
}