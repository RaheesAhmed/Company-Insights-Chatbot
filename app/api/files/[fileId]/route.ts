import { openai } from "@/app/openai";
import { Request } from "openai/src/_shims/node-types.mjs";

// download file by file ID
export async function GET(request:Request, { params: { fileId } }: { params: { fileId: string } }) {
  const [file, fileContent] = await Promise.all([
    openai.files.retrieve(fileId),
    openai.files.content(fileId),
  ]);
  return new Response(fileContent.body, {
    headers: {
      "Content-Disposition": `attachment; filename="${file.filename}"`,
    },
  });
}
