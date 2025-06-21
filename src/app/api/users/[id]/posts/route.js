import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export async function GET(request, { params }) {
  try {
    await connectToDB();

    if (!params?.id) 
    return new Response("User ID is missing", { status: 400 });

    const prompts = await Prompt.find({ creator: params.id }).populate("creator");

    return new Response(JSON.stringify(prompts), {status: 200});
  }
  catch (error) {
    console.error("Fetch error:", error);
  return new Response(JSON.stringify({ error: "Failed to fetch prompts" }), {status: 500});
  }
}