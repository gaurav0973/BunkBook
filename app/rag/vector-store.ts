import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import { embeddingModel } from "@/app/ai/embeddings";

const COLLECTION_NAME = "knowledge";

const client = new QdrantClient({
    url: process.env.QDRANT_URL!,
    apiKey: process.env.QDRANT_API_KEY,
});

let vectorStore: QdrantVectorStore | null = null;

export async function getVectorStore(): Promise<QdrantVectorStore> {
    if (vectorStore) {
        return vectorStore;
    }
    const collections = await client.getCollections();
    const exists = collections.collections.some(
        (collection) => collection.name === COLLECTION_NAME
    );
    if (!exists) {
        await client.createCollection(COLLECTION_NAME, {
            vectors: {
                size: 1536,
                distance: "Cosine",
            },
        });
    }
    vectorStore = await QdrantVectorStore.fromExistingCollection(embeddingModel, {
        client,
        collectionName: COLLECTION_NAME,
    });
    console.log("[VectorStore] Connected to Qdrant collection:", COLLECTION_NAME);
    return vectorStore;
}
