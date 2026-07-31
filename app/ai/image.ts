import OpenAI from "openai";

import { LocalStorageProvider } from "@/app/storage/local";
import { tool } from "@langchain/core/tools";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const storage = new LocalStorageProvider();

export async function generateImage(prompt: string) {
    try {
        const result = await openai.images.generate({
            model: "gpt-image-1.5",
            prompt
        });

        const imageBase64 = result.data?.[0]?.b64_json;

        if (imageBase64) {
            const imageBuffer = Buffer.from(imageBase64, "base64");
            const imageUrl = await storage.saveImage(imageBuffer);
            return {
                type: "image",
                url: imageUrl,
                prompt,
            };
        }

        const directUrl = result.data?.[0]?.url;
        if (directUrl) {
            return {
                type: "image",
                url: directUrl,
                prompt,
            };
        }

        throw new Error("No image data returned from OpenAI.");
    } catch (error: any) {
        console.error("[Image Generation Error]:", error);
        throw new Error(error?.message || "Failed to generate image.");
    }
}