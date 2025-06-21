"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import Form from "@/components/Form";

const UpdatePrompt = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {

    const getPromptDetails = async () => {

      try {
        const { data } = await axios.get(`/api/prompt/${promptId}`);
        setPost({ prompt: data.prompt, tag: data.tag });
      }
      catch (error) {
        console.error("Failed to fetch prompt details:", error);
      }
    };

    if (promptId) 
    getPromptDetails();

  }, [promptId]);

  const handleUpdatePrompt = async (e) => {

    e.preventDefault();
    setIsSubmitting(true);

    if(!promptId) 
    return alert("Missing PromptId!");

    try {
      const response = await axios.patch(`/api/prompt/${promptId}`, {
        prompt: post.prompt,
        tag: post.tag,
      });

      if (response.status === 200) {
        router.push("/");
      }
    } 
    catch (error) {
      console.error("Failed to update prompt:", error);
    } 
    finally {
      setIsSubmitting(false);
    }

  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleUpdatePrompt}  //handleSubmit in Form is actually handleUpdatePrompt from the parent (UpdatePrompt).
    />
  );
};

export default UpdatePrompt;
