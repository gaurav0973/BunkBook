import { ChatOpenAI } from "@langchain/openai";
import { tools } from "@/app/tools";

// simple LLm call
export const chatModel = new ChatOpenAI({
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
});

// LLm capable of tool calling 
export const chatModelWithTools = chatModel.bindTools(tools);