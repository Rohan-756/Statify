// "use client"

// import { Avatar } from '@/components/ui/avatar'
// import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'

// const ProfileButton = () => {
//   const [initials, setInitials] = useState("User")
//   const [profilePic, setProfilePic] = useState("/default_pfp.jpg") // fallback image

//   function getInitials(username: string): string {
//     if (!username) return "??";
  
//     const words = username.trim().split(" ");
  
//     if (words.length === 1) {
//       return words[0][0].toUpperCase();
//     }
  
//     return (words[0][0] + words[1][0]).toUpperCase();
//   }
  

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const res = await fetch("/api/profile", {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch profile");
//         }

//         const data = await res.json();
//         setInitials( getInitials(data.display_name) || "User");
//         setProfilePic(data.images?.[0]?.url || "default.jpg");
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     fetchUserProfile();
//   }, []);


//   return (
//     <Link className="rounded-full hover:ring-2 ring-[#1db954] order-2" href="/profile">
//       <Avatar className="rounded-full w-full max-h-8 aspect-square">
//           <AvatarImage 
//               className="rounded-full w-full max-h-8 aspect-square"
//               src={profilePic}
//               alt="Profile" />
//           <AvatarFallback className="flex items-center justify-center aspect-square text-white bg-blue-800">
//             {initials}</AvatarFallback>
//         </Avatar>
//     </Link>
//   )
// }

// export default ProfileButton



// SEO


"use client"

import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ProfileButton = () => {
  const [initials, setInitials] = useState("User")
  const [profilePic, setProfilePic] = useState("/default_pfp.jpg") // fallback image

  function getInitials(username: string): string {
    if (!username) return "??";
  
    const words = username.trim().split(" ");
  
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }
  
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  
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
        setInitials(getInitials(data.display_name) || "User");
        setProfilePic(data.images?.[0]?.url || "default.jpg");
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Link 
      className="rounded-full hover:ring-2 ring-[#1db954] order-2" 
      href="/profile"
      aria-label="Go to your Spotify profile"
      title="Go to Profile"
    >
      <Avatar className="rounded-full w-full max-h-8 aspect-square">
        <AvatarImage 
          className="rounded-full w-full max-h-8 aspect-square"
          src={profilePic}
          alt={`Profile picture of ${initials || "User"}`} 
        />
        <AvatarFallback 
          className="flex items-center justify-center aspect-square text-white bg-blue-800"
          aria-hidden="true"
        >
          {initials}
        </AvatarFallback>
      </Avatar>
    </Link>
  )
}

export default ProfileButton
