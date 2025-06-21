import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

// GET request handler
export async function GET(request) {
  try {
    
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    return Response.json(prompts, { status: 200 });

  } 
  catch (error) 
  {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
}
