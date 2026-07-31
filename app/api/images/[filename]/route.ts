import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    try {
        const { filename } = await params;
        
        // Clean filename parameter to prevent path traversal
        const safeFilename = path.basename(filename);
        
        const filePath = path.join(
            process.cwd(),
            "public",
            "generated-images",
            safeFilename
        );

        if (!fs.existsSync(filePath)) {
            return new NextResponse("Image not found", { status: 404 });
        }

        const fileBuffer = fs.readFileSync(filePath);

        let contentType = "image/png";
        if (safeFilename.endsWith(".jpg") || safeFilename.endsWith(".jpeg")) {
            contentType = "image/jpeg";
        } else if (safeFilename.endsWith(".webp")) {
            contentType = "image/webp";
        } else if (safeFilename.endsWith(".svg")) {
            contentType = "image/svg+xml";
        }

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch (error) {
        console.error("[Serve Image API Error]:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
