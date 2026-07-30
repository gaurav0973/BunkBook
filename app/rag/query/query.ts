import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { chatModel } from "@/app/ai/llm";
import { buildContext } from "./context";
import { buildRAGPrompt, RAG_SYSTEM_PROMPT } from "./prompt";
import { retrieveDocuments } from "./retriever";
import { Schemas } from "@qdrant/js-client-rest";

/**
 * Full RAG pipeline: retrieve → context → prompt → LLM → answer
 */
export async function queryRAG(
    question: string,
    filter?: Schemas["Filter"]
): Promise<string> {
    // Step 1: Retrieve relevant chunks from vector store
    const documents = await retrieveDocuments(question, 4, filter);

    // Step 2: Format chunks into a single context string
    const context = buildContext(documents);

    // Step 3: Build the LLM prompt messages
    const messages = [
        new SystemMessage(RAG_SYSTEM_PROMPT),
        new HumanMessage(buildRAGPrompt(context, question)),
    ];

    // Step 4: Call the LLM
    const response = await chatModel.invoke(messages);

    // Step 5: Return the answer
    return typeof response.content === "string"
        ? response.content
        : String(response.content);
}
