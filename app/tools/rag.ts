import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { queryRAG } from "@/app/rag/query/query";

export const ragTool = tool(
    async ({ question, notebookId }) => {
        const filter = notebookId
            ? {
                  must: [
                      {
                          key: "metadata.notebookId",
                          match: { value: notebookId },
                      },
                  ],
              }
            : undefined;

        return await queryRAG(question, filter);
    },
    {
        name: "knowledge_base",
        description: `Use this tool to answer questions using the indexed knowledge base.

Use it whenever the user asks about:
- Uploaded PDFs or resumes
- User's name, profile, or background from uploaded documents
- YouTube videos
- Websites
- Documents
- Notes
- Course material

Do not use this tool for general knowledge questions.`,
        schema: z.object({
            question: z
                .string()
                .describe("The user's question to search in the knowledge base."),
            notebookId: z
                .string()
                .optional()
                .describe("Optional notebookId to scope the search to a specific notebook."),
        }),
    }
);