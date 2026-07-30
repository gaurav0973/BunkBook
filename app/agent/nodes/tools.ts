import { ToolNode } from "@langchain/langgraph/prebuilt";
import { tools } from "@/app/tools";


export const toolsNode = new ToolNode(tools);