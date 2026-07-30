import { NextRequest, NextResponse } from "next/server";
import { loadSource, LoadSourceParams } from "@/app/loaders";
import { indexDocuments, SourceMetadata } from "@/app/rag";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const sourceParams = (body.source ?? body) as LoadSourceParams;
        const metadata = (body.metadata ?? body) as SourceMetadata;

        if (!sourceParams?.sourceType) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing required parameter: sourceType.",
                },
                { status: 400 }
            );
        }

        // 1. Load documents using the appropriate document loader
        const documents = await loadSource(sourceParams);

        if (!documents || documents.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "No document content was retrieved.",
                },
                { status: 400 }
            );
        }

        // 2. Chunk, enrich, and store in Qdrant
        await indexDocuments(documents, metadata);

        return NextResponse.json({
            success: true,
            message: "Documents indexed successfully.",
            documentCount: documents.length,
        });
    } catch (error: any) {
        console.error("Error during document indexing:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to index documents.",
                error: error?.message ?? "Internal server error.",
            },
            { status: 500 }
        );
    }
}