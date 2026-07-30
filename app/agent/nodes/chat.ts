import { chatModel, chatModelWithTools } from "@/app/ai/llm";
import { AgentState } from "../state";


// talk to the llm
export async function chatNode(state: typeof AgentState.State){
    const response = await chatModelWithTools.invoke(state.messages);
    return {
        messages: [response],
    };
}