import { TextLoader } from "@langchain/classic/document_loaders/fs/text"
import { Document } from "@langchain/core/documents";

export async function loadMarkdown(filePath: string): Promise<Document[]> {
    const loader = new TextLoader(filePath);

    return await loader.load();
}