import Prompt from "@/models/prompt.js";
import { connectToDB } from "@/utils/database.js";

export async function POST(request) {

  const { userId, prompt, tag } = await request.json();

  try {

    await connectToDB();

    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
    });

    return Response.json(newPrompt, { status: 201 });
  } 
  catch (error) 
  {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
}