import { Document } from "@langchain/core/documents";
import { chunkDocuments } from "./chunker";
import { getVectorStore } from "../vector-store";
import { SourceMetadata } from "../types";

/**
 * Takes documents, chunks them, enriches chunk metadata,
 * and stores them in the Qdrant vector store.
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

    console.log(`[Indexer] Indexed ${enrichedChunks.length} chunks for source: ${metadata.sourceName}`);
}
