import { Annotation, messagesStateReducer } from "@langchain/langgraph";
import { BaseMessage } from "@langchain/core/messages";

/**
AgentState = {
    messages,
    retrievalContext,
    artifacts,
}
 */
export const AgentState = Annotation.Root({

    // conversation => user/assistant/tools 
    messages: Annotation<BaseMessage[]>({
        reducer: messagesStateReducer,
        default: () => [],
    }),

    // Transcript/PDF/website/multiple soources 
    retrievalContext: Annotation<string>({
        reducer: (_, value) => value,
        default: () => "",
    }),

    // tool results from the tool call 
    artifacts : Annotation<Record<string, unknown>>({
        reducer: (current, update) => ({
            ...current,
            ...update,
        }),
        default: () => ({}),
    }),
});