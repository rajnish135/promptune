"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useParams } from "next/navigation";

import Profile from "@/components/Profile";

const UserProfile = () => {

  const { id } = useParams(); // ✅ Gets /profile/[id]
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");


  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {

    const fetchPosts = async () => {

      try {
        const response = await axios.get(`/api/users/${id}/posts`);
        setUserPosts(response.data);
      } 

      catch (error) {
        console.error("Failed to fetch user posts:", error);
      }

    };

    if(id) 
    fetchPosts();

  }, [id]);

  return (

    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />

  );
};

export default UserProfile;
