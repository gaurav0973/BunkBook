import { z } from "zod";

export const webSearchSchema = z.object({
    query: z.string().describe("The search query."),
});