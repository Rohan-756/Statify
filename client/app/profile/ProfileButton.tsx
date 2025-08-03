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
    <Link href="/profile">
      <Button className={`py-1 pl-[4px] font-semibold rounded-full flex
        bg-[#1ed760] hover:bg-[#1db954] cursor-pointer active:bg-[#1db954] 
        justify-center items-center min-h-10 h-min max-sm:text-xs max-sm:px-[4px] max-sm:pr-[8px]`}>
        {/* <img
          className="rounded-full w-full max-h-8 max-sm:max-h-6 aspect-square mr-2"
          src={profilePic}
          alt="Profile"
        /> */}
        <Avatar className="">
          <AvatarImage 
              className="rounded-full w-full max-h-8 max-sm:max-h-6 aspect-square mr-2"
              src={profilePic}
              alt="Profile" />
          <AvatarFallback className="flex items-center justify-center aspect-square text-white bg-blue-800">
            BN</AvatarFallback>
        </Avatar>
        {username}
      </Button>
    </Link>
  )
}

export default ProfileButton
