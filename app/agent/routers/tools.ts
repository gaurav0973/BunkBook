// kya mere model ne tool call ki request kari hai ? 
import { AIMessage } from "@langchain/core/messages";
import { AgentState } from "../state";


/**
 * kya tool scalling ki need hai ? 
 * - yes => go to tool node
 *   no => go to end node
 */
export function toolsRouter(state: typeof AgentState.State) {
    const lastMessage = state.messages[state.messages.length - 1];
    if (lastMessage instanceof AIMessage && lastMessage.tool_calls?.length) {
        return "tools";
    }
    return "__end__";
}