import { chatModelWithTools } from "@/app/ai/llm";
import { AgentState } from "../state";
import { SystemMessage } from "@langchain/core/messages";

export async function chatNode(state: typeof AgentState.State) {
  const currentDate = new Date().toISOString().split("T")[0];

  const agentSystemPrompt = new SystemMessage(
    `You are BunkBook AI, an intelligent study companion and learning assistant.
Today's current date is ${currentDate}.

Tool Usage Guidelines:
1. Use the 'knowledge_base' tool whenever the user asks about uploaded learning materials, PDFs, resumes, personal details/name in uploaded files, YouTube videos, websites, course documents, or notes.
2. If the user asks "what is my name?", "who am I?", or questions about their background/resume, use the 'knowledge_base' tool to search for user profile/resume details.
3. Use the 'web_search' tool whenever the user asks for current news, latest web information, weather, or real-time web search.
4. If no external information or knowledge base search is needed (e.g. general conversation like "hello", simple math/reasoning), answer directly.
5. If user asks to generate an image, use the 'generate_image' tool. When the tool returns the image URL, embed it in your response using markdown syntax: ![description](imageUrl).
6. Keep your answers clear, educational, and structured using clean markdown.`
  );

  // Prepend system prompt to guide LLM tool calling behavior
  const messagesWithSystem = [agentSystemPrompt, ...state.messages];
  const response = await chatModelWithTools.invoke(messagesWithSystem);
  
//   console.log("[Chat Node Output]:", {
//     content: response.content,
//     tool_calls: (response as any).tool_calls,
//   });

  return {
    messages: [response],
  };
}