import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { Document } from "@langchain/core/documents";

export async function loadYoutube(url: string): Promise<Document[]> {
    const loader = YoutubeLoader.createFromUrl(url, {
        addVideoInfo: true,
    });
    return await loader.load();
}