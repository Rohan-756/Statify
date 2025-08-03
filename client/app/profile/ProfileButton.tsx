"use client"

import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ProfileButton = () => {
  const [username, setUsername] = useState("Username")
  const [profilePic, setProfilePic] = useState("/default_pfp.jpg") // fallback image

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch("/api/profile", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setUsername(data.display_name || "Username");
        setProfilePic(data.images?.[0]?.url || "default.jpg");
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);


  return (
    <Link className="rounded-full hover:ring-2 ring-[#1db954] order-2" href="/profile">
      <Avatar className="rounded-full w-full max-h-8 aspect-square">
          <AvatarImage 
              className="rounded-full w-full max-h-8 aspect-square"
              src={profilePic}
              alt="Profile" />
          <AvatarFallback className="flex items-center justify-center aspect-square text-white bg-blue-800">
            BN</AvatarFallback>
        </Avatar>
    </Link>
  )
}

export default ProfileButton
