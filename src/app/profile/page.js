"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Profile from "@/components/Profile.jsx";

const MyProfile = () => {

  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {

    const fetchPosts = async () => {

      try {
        const response = await axios.get(`/api/users/${session?.user.id}/posts`);
        setMyPosts(response.data);
      } 
      catch (error) {
        console.error("Failed to fetch posts:", error);
      }

    };

    if (session?.user.id) 
    fetchPosts();

  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };


  const handleDelete = async (post) => {

    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed){

      try {
        await axios.delete(`/api/prompt/${post._id.toString()}`);
        const filteredPosts = myPosts.filter((item) => item._id !== post._id);
        setMyPosts(filteredPosts);
      }
      catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
