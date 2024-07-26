import { assistantId } from './../../assistant-config';
import { openai } from "@/app/openai";



export const runtime = "nodejs";
// Create a new assistant
export async function POST(request: Request) {
  const { name, instructions, model } =await request.json();
  const assistant = await openai.beta.assistants.update(assistantId,{
    instructions:instructions,
    name: name,
    model: model,
    tools: [
      { type: "code_interpreter" },
      
      // {
      //   type: "function",
      //   function: {
      //     name: "getCryptoPrices",
      //     description: "Get the crypto prices",
      //     parameters: {
      //       type: "object",
      //       properties: {
      //         symbol: {
      //           type: "string",
      //           description: "The name of the crypto currency",
      //         }
      //       },
      //       required: ["symbol"],
      //     },
      //   },
      // },
      { type: "file_search" },
    ],
  });
  return Response.json({ assistantId: `Assistant Updated with ID: ${assistant.id}` });
}


export async function GET() {
  const assistant = await openai.beta.assistants.retrieve(assistantId)

  return Response.json(assistant);


}