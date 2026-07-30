import fs from "node:fs/promises";

import { Document } from "@langchain/core/documents";
import { extractText, getDocumentProxy } from "unpdf";

export async function loadPdf(filePath: string): Promise<Document[]> {
    const buffer = await fs.readFile(filePath);

    const pdf = await getDocumentProxy(new Uint8Array(buffer));

    const { text } = await extractText(pdf, {
        mergePages: false,
    });

    return text.map((pageText, index) => {
        return new Document({
            pageContent: pageText,
            metadata: {
                source: filePath,
                page: index + 1,
            },
        });
    });
}