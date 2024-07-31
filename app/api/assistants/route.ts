import { assistantId } from './../../assistant-config';
import { openai } from "@/app/openai";



export const runtime = "nodejs";
// Create a new assistant
export async function POST(request: Request) {
  const { name, instructions, model } =await request.json();
  const assistant = await openai.beta.assistants.update(assistantId,{
    instructions:instructions,
    name: name ,
    model: model || "gpt-4o-mini",
    tools: [
      { type: "code_interpreter" },
      
      { type: "file_search" },
    ],
  });
  return Response.json({ assistantId: `Assistant Updated with ID: ${assistant.id}` });
}


export async function GET() {
  const assistant = await openai.beta.assistants.retrieve(assistantId)

  return Response.json(assistant);


}