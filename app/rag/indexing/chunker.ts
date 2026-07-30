import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
});

export async function chunkDocuments(
    documents: Document[]
): Promise<Document[]> {
    return textSplitter.splitDocuments(documents);
}
