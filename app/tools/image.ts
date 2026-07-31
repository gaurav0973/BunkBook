import { tool } from "@langchain/core/tools";
import { z } from "zod";

import { generateImage } from "@/app/ai/image";

export const imageTool = tool(
    async ({ prompt }) => {
        const result = await generateImage(prompt);

        return {
            success: true,
            url: result.url,
            prompt: result.prompt,
        };
    },
    {
        name: "generate_image",
        description:
            "Generate an AI image whenever the user asks to create, draw, design, illustrate or render an image.",
        schema: z.object({
            prompt: z
                .string()
                .describe("The prompt for image generation"),
        }),
    }
);