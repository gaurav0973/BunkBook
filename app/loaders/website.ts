import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { Document } from "@langchain/core/documents";

export async function loadWebsite(url: string): Promise<Document[]> {
    const loader = new CheerioWebBaseLoader(url);
    return await loader.load();
}