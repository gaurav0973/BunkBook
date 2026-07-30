import { getVectorStore } from "@/app/rag/vector-store";



export async function GET(){
    await getVectorStore();
    return Response.json({ message: "done" });
}