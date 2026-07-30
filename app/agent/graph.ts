import { StateGraph } from "@langchain/langgraph";

// state
import { AgentState } from "./state";

// nodes
import { chatNode } from "./nodes/chat";

export const graph = new StateGraph(AgentState)
    .addNode("chat", chatNode)
    .addEdge("__start__", "chat")
    .addEdge("chat", "__end__")
    .compile();