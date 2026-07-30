import {
    StateGraph,
} from "@langchain/langgraph";

import { AgentState } from "./state";
import {
    chatNode,
    toolsNode,
} from "./nodes";
import { toolsRouter } from "./routers";

export const graph = new StateGraph(AgentState)
    .addNode("chat", chatNode)
    .addNode("tools", toolsNode)
    .addEdge("__start__", "chat")
    .addConditionalEdges(
        "chat",
        toolsRouter,
    )
    .addEdge("tools", "chat")
    .compile();