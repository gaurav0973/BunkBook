import { Document } from "@langchain/core/documents";
import { getSubtitles } from "youtube-caption-extractor";

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
    try {
        // Try Hindi subtitles first
        return await getSubtitles({
            videoID: videoId,
            lang: "hi",
        });
    } catch {
        try {
            // Fall back to English subtitles
            return await getSubtitles({
                videoID: videoId,
                lang: "en",
            });
        } catch {
            throw new Error(
                "No Hindi or English subtitles found for this video."
            );
        }
    }
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
                startTime: segment.start,
                endTime: segment.start + segment.dur,
                duration: segment.dur,
                source: `https://www.youtube.com/watch?v=${videoId}&t=${Math.floor(segment.start)}s`,
            },
        });
    });
}

export async function loadYoutube(url: string): Promise<Document[]> {
    const videoId = extractVideoId(url);
    const transcript = await fetchTranscript(videoId);
    return transcriptToDocuments(transcript, videoId);
}