"use client";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form.jsx";

const CreatePrompt = () => {

  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e) => {

    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/prompt/new", {
        prompt: post.prompt,
        userId: session?.user.id,
        tag: post.tag,
      });

    if (response.status === 201) {
        router.push("/");
      }
    }

    catch (error) {
      console.error("Failed to create prompt:", error);
    }
     
    finally {
      setIsSubmitting(false);
    }
    
  };


  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
