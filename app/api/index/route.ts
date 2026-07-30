import fs from "node:fs/promises";
import path from "node:path";

import { loadSource } from "@/app/loaders";
import { LoadSourceParams } from "@/app/loaders/types";
import { indexDocuments } from "@/app/rag/indexing/indexer";
import { SourceMetadata, SourceType } from "@/app/rag/types";

export async function POST(request: Request) {
    try {
        const contentType = request.headers.get("content-type") ?? "";

        let sourceParams: LoadSourceParams;
        let metadata: SourceMetadata;

        // ==========================================
        // File Upload (PDF, DOCX, Markdown, Text)
        // ==========================================
        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();

            const file = formData.get("file");

            const sourceType = formData.get("sourceType");

            if (!(file instanceof File)) {
                return Response.json(
                    {
                        success: false,
                        message: "File is required.",
                    },
                    {
                        status: 400,
                    }
                );
            }

            if (
                sourceType !== "pdf" &&
                sourceType !== "docx" &&
                sourceType !== "markdown" &&
                sourceType !== "text"
            ) {
                return Response.json(
                    {
                        success: false,
                        message: "Invalid source type.",
                    },
                    {
                        status: 400,
                    }
                );
            }

            const uploadsDir = path.join(process.cwd(), "uploads");

            await fs.mkdir(uploadsDir, {
                recursive: true,
            });

            const fileName = `${Date.now()}-${file.name}`;

            const filePath = path.join(uploadsDir, fileName);

            const buffer = Buffer.from(await file.arrayBuffer());

            await fs.writeFile(filePath, buffer);

            sourceParams = {
                sourceType,
                filePath,
            };

            metadata = {
                sourceId: crypto.randomUUID(),
                sourceName: file.name,
                sourceType,
                userId: undefined,
                notebookId: undefined,
            };
        }

        // ==========================================
        // Website / YouTube
        // ==========================================
        else {
            const body = await request.json();

            const { url, sourceType } = body;

            if (!url) {
                return Response.json(
                    {
                        success: false,
                        message: "URL is required.",
                    },
                    {
                        status: 400,
                    }
                );
            }

            if (sourceType !== "website" && sourceType !== "youtube") {
                return Response.json(
                    {
                        success: false,
                        message: "Invalid source type.",
                    },
                    {
                        status: 400,
                    }
                );
            }

            sourceParams = {
                sourceType,
                url,
            };

            metadata = {
                sourceId: crypto.randomUUID(),
                sourceName: url,
                sourceType,
                userId: undefined,
                notebookId: undefined,
            };
        }

        const documents = await loadSource(sourceParams);

        await indexDocuments(documents, metadata);

        return Response.json({
            success: true,
            message: "Documents indexed successfully.",
        });
    } catch (error) {
        console.error("[INDEX_ROUTE_ERROR]", error);

        return Response.json(
            {
                success: false,
                message: "Failed to index documents.",
            },
            {
                status: 500,
            }
        );
    }
}