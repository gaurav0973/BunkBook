import { Document } from "@langchain/core/documents";
import { YoutubeTranscript } from "youtube-transcript";

function extractVideoId(url: string): string {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === "youtu.be") {
        return parsedUrl.pathname.slice(1);
    }
    const videoId = parsedUrl.searchParams.get("v");

    if (!videoId) {
        throw new Error("Invalid YouTube URL");
    }

    return videoId;
}

async function fetchTranscript(videoId: string) {
    return await YoutubeTranscript.fetchTranscript(videoId);
}

function transcriptToDocuments(
    transcript: Awaited<ReturnType<typeof fetchTranscript>>,
    videoId: string
): Document[] {
    return transcript.map((segment) => {
        return new Document({
            pageContent: segment.text,
            metadata: {
                videoId,
                startTime: segment.offset,
                duration: segment.duration,
            },
        });
    });
}

export async function loadYoutube(url: string): Promise<Document[]> {
    const videoId = extractVideoId(url);

    const transcript = await fetchTranscript(videoId);

    return transcriptToDocuments(transcript, videoId);
}