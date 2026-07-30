import { Document } from "@langchain/core/documents";

import { loadDocx } from "./docx";
import { loadMarkdown } from "./markdown";
import { loadPdf } from "./pdf";
import { loadText } from "./text";
import { LoadSourceParams } from "./types";
import { loadWebsite } from "./website";
import { loadYoutube } from "./youtube";

export async function loadSource(
    options: LoadSourceParams
): Promise<Document[]> {
    switch (options.sourceType) {
        case "pdf":
            return loadPdf(options.filePath);

        case "docx":
            return loadDocx(options.filePath);

        case "markdown":
            return loadMarkdown(options.filePath);

        case "text":
            return loadText(options.filePath);

        case "website":
            return loadWebsite(options.url);

        case "youtube":
            return loadYoutube(options.url);
    }
}