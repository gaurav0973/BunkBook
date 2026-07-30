import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { Document } from "@langchain/core/documents";

export async function loadDocx(filePath: string): Promise<Document[]> {
    const loader = new DocxLoader(filePath);
    return await loader.load();
}