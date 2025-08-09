// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import './auth.css';
// import { Frown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import TopShadow from "@/components/TopShadow";

// const Page = () => {
//     const searchParams = useSearchParams();
//     /* get code param from URL */
//     const code = searchParams.get("code");
//     const router = useRouter();

//     /* error variable */
//     const [error, setError] = useState(false);

//     /* fetch cookies from backend */
//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const response = await fetch(`/api/callback?code=${code}`, {
//                     method: "GET",
//                     credentials: "include",
//                 });

//                 if (!response.ok) {
//                     throw new Error(`Error ${response.status}: ${response.statusText}`);
//                 }

//                 // console.log("Authentication complete");
//                 router.push("/stats");
//             } catch (err) {
//                 console.error("Authentication failed", err);
//                 setError(true); // 👈 Show error message
//             }
//         };

//         fetchUserData();
//     }, []);

//     return (
//         <>
//             {/* shadow effect */}
//             {/* <div className="w-full h-0 shadow-[0_0_300px_150px_rgba(0,0,0,0.5)] fixed -z-2 shadow-[rgb(174,0,255)] topShadow"></div> */}
//             <TopShadow className="topShadow"/>

//             {/* message container */}
//             <div className=" flex flex-col justify-center items-center w-screen h-screen">
//                 {error ? (
//                     <>
//                         {/* in case of error */}
//                         <Frown className="text-slate-600 dark:text-white w-[80px] h-[80px] mb-[20px]"/>
//                         <div className="text-2xl font-semibold text-red-500 mb-3 TRANS_OFF">Something went wrong</div>
//                         <Link href="/">
//                         <Button className="text-lg  font-semibold m-3 bg-[#1ed760] 
//                         hover:bg-[#1db954] cursor-pointer rounded-full px-5">Click to go back</Button>
//                         </Link>
                        
//                     </>
//                 ) : (
//                     <>
//                         {/* if no error */}
//                         <div className="spinning-disk"></div>
//                         <div className="text-2xl font-semibold mb-1">Signing you in...</div>
//                     </>
//                 )}
//             </div>
//         </>
//     );
// };

// export default Page;


/* SEO */

"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./auth.css";
import { Frown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TopShadow from "@/components/TopShadow";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      setError(true);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/callback?code=${code}`, {
          method: "GET",
          credentials: "include", // Required so browser stores the session cookie
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // ✅ Session cookie should now be set by backend
        // Optionally verify session before redirect
        const verify = await fetch(`/api/me`, { credentials: "include" });
        if (verify.ok) {
          router.push("/stats");
        } else {
          throw new Error("Session not established");
        }
      } catch (err) {
        console.error("Authentication failed", err);
        setError(true);
      }
    };

    fetchUserData();
  }, [searchParams, router]);

  return (
    <>
      <TopShadow className="topShadow" />
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        {error ? (
          <>
            <Frown className="text-slate-600 dark:text-white w-[80px] h-[80px] mb-[20px]" />
            <div className="text-2xl font-semibold text-red-500 mb-3 TRANS_OFF">
              Something went wrong
            </div>
            <Link href="/">
              <Button
                className="text-lg font-semibold m-3 bg-[#1ed760] 
                hover:bg-[#1db954] cursor-pointer rounded-full px-5"
              >
                Click to go back
              </Button>
            </Link>
          </>
        ) : (
          <>
            <div className="spinning-disk"></div>
            <div className="text-2xl font-semibold mb-1">Signing you in...</div>
          </>
        )}
      </div>
    </>
  );
}
