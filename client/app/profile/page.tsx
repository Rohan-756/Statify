// import NavBar from '@/components/NavBar'
// import "./profile.css"
// import React from 'react'
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'

// const page = () => {
//   return (
//     <>
//       <div className="top-shadow -z-10"></div>
//       <NavBar stats="true" />
//       <div className="p-2">
//         <div className="max-w-2xl mx-auto mt-25 p-4 grid grid-cols-2 backdrop-blur-xl bg-[rgb(255,255,255,0.4)] rounded-2xl">
//           <div className="w-50 h-50">
//             <img className="rounded-full aspect-square " src="man_listening_songs.jpg"></img>
//           </div>
//           <div className="flex flex-col justify-center">
//             <span>Username</span>
//             <span>name</span>
//             <span>email</span>
//             <Link href="/">
//               <Button className="rounded-full hover:bg-[#1db954] bg-[#1ed760]
//                    max-sm:text-xs max-sm:px-2 cursor-pointer TRANS_OFF">
//                 Go to Spotify
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>

//     </>
//   )
// }

// export default page

// "use client";

// import NavBar from '@/components/NavBar';
// import "./profile.css";
// import React, { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// interface SpotifyProfile {
//   display_name: string;
//   email: string;
//   images?: { url: string }[];
//   id: string;
//   external_urls?: { spotify: string };
// }

// const Page = () => {
//   const [profile, setProfile] = useState<SpotifyProfile | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch("/api/profile", {
//           credentials: "include",
//         });

//         if (!res.ok) throw new Error("Failed to fetch profile");

//         const data = await res.json();
//         setProfile(data);
//       } catch (err) {
//         console.error("Error fetching user profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-4 text-center text-lg font-semibold">
//         Loading profile...
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="p-4 text-center text-red-500 font-semibold">
//         Failed to load profile.
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="top-shadow -z-10"></div>
//       <NavBar stats="true" />
//       <div className="p-2">
//         <div className="max-w-2xl mx-auto mt-24 p-4 grid grid-cols-2 gap-4 backdrop-blur-xl 
//         bg-[rgb(255,255,255,0.4)] dark:bg-[rgba(84,83,83,0.4)] rounded-2xl">
//           <div className="w-50 h-50 flex justify-center items-center">
//             <img
//               className="rounded-full aspect-square w-32 h-32 object-cover ring-1 ring-slate-300"
//               src={profile.images?.[0]?.url || "/default_pfp.jpg"}
//               alt={profile.display_name}
//             />
//           </div>
//           <div className="flex flex-col justify-center gap-2">
//             <span className="font-bold text-xl">{profile.display_name}</span>
//             <span className="text-gray-700">{profile.id}</span>
//             <span className="text-gray-600 dark:text-gray-400">{profile.email}</span>
//             <Link
//               href={profile.external_urls?.spotify || "https://spotify.com"}
//               target="_blank"
//             >
//               <Button className="rounded-full hover:bg-[#1db954] bg-[#1ed760]
//               mt-3 max-sm:text-xs max-sm:px-2 cursor-pointer TRANS_OFF">
//                 Go to Spotify
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Page;

"use client";

import NavBar from '@/components/NavBar';
import "./profile.css";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProfileButton from './ProfileButton';

interface SpotifyProfile {
  display_name: string;
  email: string;
  images?: { url: string }[];
  id: string;
  followers?: { total: number };
  external_urls?: { spotify: string };
}

const Page = () => {
  const [profile, setProfile] = useState<SpotifyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch profile info
        const res = await fetch("/api/profile", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center text-lg font-semibold">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-4 text-center text-red-500 font-semibold">
        Failed to load profile.
      </div>
    );
  }

  return (
    <>
      <div className="top-shadow"></div>
      <NavBar stats="true" />
      <div className="p-2 mt-24">
        <div className="max-w-2xl mx-auto p-4 grid grid-cols-[1fr_2fr] gap-4 backdrop-blur-xl 
        bg-[rgba(210,210,210,0.4)] dark:bg-[rgba(84,83,83,0.4)] rounded-2xl">
          <div className="w-min h-min flex justify-center items-center">
            <img
              className="rounded-full aspect-square w-32 max-sm:w-22 object-cover ring-1 ring-slate-300"
              src={profile.images?.[0]?.url || "/default_pfp.jpg"}
              alt={profile.display_name}
            />
          </div>
          <div className="flex flex-col justify-center gap-2">
            <span className="font-bold text-xl max-sm:text-lg">{profile.display_name}</span>
            <span className="text-gray-700 dark:text-gray-300 max-sm:text-sm">
              {profile.followers?.total?.toLocaleString() || 0} Followers
            </span>
            <span className="text-gray-700 dark:text-gray-300 max-sm:text-sm">{profile.email}</span>
            <Link
              href={profile.external_urls?.spotify || "https://spotify.com"}
              target="_blank"
            >
              <Button className="rounded-full hover:bg-[#1db954] bg-[#1ed760]
              mt-3 max-sm:text-xs max-sm:px-2 cursor-pointer TRANS_OFF">
                Go to Spotify
              </Button>
            </Link>
          </div>
        </div>
          <Button variant="destructive"
          className="rounded-full w-1/2 min-w-30 mt-10 block mx-auto
          font-medium max-w-2xs">Logout</Button>
        </div>
    </>
  );
};

export default Page;
