import { chatModel } from "@/app/ai/llm";
import { AgentState } from "../state";

export async function chatNode(state: typeof AgentState.State){
    const response = await chatModel.invoke(state.messages);
    return {
        messages: [...state.messages, response],
    };
}