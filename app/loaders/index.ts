import { loadDocx } from "./docx";
import { loadMarkdown } from "./markdown";
import { loadPdf } from "./pdf";
import { loadText } from "./text";
import { LoadSourceParams } from "./types";
import { loadWebsite } from "./website";
import { loadYoutube } from "./youtube";

export async function loadSource(params: LoadSourceParams) {
    switch (params.sourceType) {
        case "pdf":
            return loadPdf(params.filePath);

        case "youtube":
            return loadYoutube(params.url);

        case "website":
            return loadWebsite(params.url);

        case "markdown":
            return loadMarkdown(params.filePath);

        case "text":
            return loadText(params.filePath);

        case "docx":
            return loadDocx(params.filePath);

        default:
            throw new Error("Unsupported source type.");
    }
}

export * from "./types";
