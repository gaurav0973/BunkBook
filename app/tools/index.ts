import { ragTool } from "./rag";
import { webSearchTool } from "./search";

export { ragTool, webSearchTool };


export const tools = [
    webSearchTool , ragTool,
];