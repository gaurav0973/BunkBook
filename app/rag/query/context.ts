import { Document } from "@langchain/core/documents";

/**
 * Merges retrieved documents into a single context string
 * that is injected into the LLM prompt.
 */
export function buildContext(documents: Document[]): string {
    return documents
        .map((doc) => doc.pageContent)
        .join("\n\n--------------------\n\n");
}
