import { OpenAIEmbeddings } from "@langchain/openai";

export const embeddingModel = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY,
});