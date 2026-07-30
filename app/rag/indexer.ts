import { Document } from "@langchain/core/documents";
import { chunkDocuments } from "./chunker";
import { getVectorStore } from "./vector-store";
import { SourceMetadata } from "./types";

/**
 * Takes documents, chunks them, enriches chunk metadata, and indexes them into vector store.
 */
export async function indexDocuments(
    documents: Document[],
    metadata: SourceMetadata
): Promise<void> {
    const chunks = await chunkDocuments(documents);
    const enrichedChunks = chunks.map((chunk, index) => {
        chunk.metadata = {
            ...chunk.metadata,
            ...metadata,
            chunkIndex: index,
        };
        return chunk;
    });
    const vectorStore = await getVectorStore();
    await vectorStore.addDocuments(enrichedChunks);
}