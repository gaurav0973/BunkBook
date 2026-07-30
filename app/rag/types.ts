// Shared types across the RAG pipeline
export type SourceType =
    | "pdf"
    | "youtube"
    | "website"
    | "markdown"
    | "text"
    | "docx";

export interface SourceMetadata {
    userId: string;
    notebookId: string;
    sourceId: string;
    sourceType: SourceType;
    sourceName: string;
}