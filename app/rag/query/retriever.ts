import { Document } from "@langchain/core/documents";
import { getVectorStore } from "../vector-store";
import { Schemas } from "@qdrant/js-client-rest";

/**
 * Fetches the top-k most semantically similar documents
 * from the Qdrant vector store for the given query.
 */
export async function retrieveDocuments(
    query: string,
    k: number = 4,
    filter?: Schemas["Filter"]
): Promise<Document[]> {
    const vectorStore = await getVectorStore();
    return vectorStore.similaritySearch(query, k, filter);
}
