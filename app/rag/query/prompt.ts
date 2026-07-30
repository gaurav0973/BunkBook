export const RAG_SYSTEM_PROMPT = `
You are a helpful AI assistant.

Answer the user's question using ONLY the provided context.

If the answer cannot be found in the context, say:

"I couldn't find that information in the provided documents."

Do not make up facts.
Keep your answers clear and concise.
`;

export function buildRAGPrompt(context: string, question: string): string {
    return `
Context:
${context}

Question:
${question}
`;
}
