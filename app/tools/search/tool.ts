import { tavily } from "@tavily/core";
import { tool } from "@langchain/core/tools";
import { webSearchSchema } from "./schema";

const tvlyClient = tavily({
    apiKey: process.env.TAVILY_API_KEY || process.env.TVILY_API_KEY,
});

export const webSearchTool = tool(
    async ({ query }) => {
        return await tvlyClient.search(query);
    },
    {
        name: "web_search",
        description: "Search the web for recent information.",
        schema: webSearchSchema,
    }
);