// ; // only needed in app router

// import Footer from '@/components/Footer';
// import NavBar from '@/components/NavBar';
// import TopShadow from '@/components/TopShadow';
// import React from "react";
// import TabsContainer from './components/TabsContainer';

// export default function StatsPage() {
  
//   return (
//     <>

//       {/* top shdaow */}

//       <TopShadow />

//       {/* navbar */}

//       <NavBar login="false"/>

//       {/* main body */}

//       <main className="w-full h-full">
//         {/* header line */}
//         <div className="w-full max-w-2xl mt-30 flex flex-col px-3 items-start justify-center mx-auto">
//           <span className="text-5xl max-sm:text-3xl font-semibold text-slate-800 dark:text-white">Your Music. Your Stats.</span>
//           <span className="text-5xl max-sm:text-3xl font-semibold text-slate-200 dark:text-[rgb(49,0,67)]">All in one place.</span>
//         </div>
//         {/* output data */}
//         <TabsContainer/>
//       </main>

//       <Footer />
//     </>
//   );
// }


/* SEO */

"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import TopShadow from "@/components/TopShadow";
import React, { useEffect, useState } from "react";
import TabsContainer from "./components/TabsContainer";
import { useRouter } from "next/navigation";

export default function StatsPage() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (res.ok) {
          setLoggedIn(true);
        } else {
          router.push("/"); // Not logged in → redirect home
        }
      } catch (error) {
        console.error("Error checking session", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="text-lg font-semibold">Loading your stats...</div>
      </div>
    );
  }

  return (
    <>
      <TopShadow />
      <NavBar login={!loggedIn.toString()} />
      <main className="w-full h-full">
        <div className="w-full max-w-2xl mt-30 flex flex-col px-3 items-start justify-center mx-auto">
          <span className="text-5xl max-sm:text-3xl font-semibold text-slate-800 dark:text-white">
            Your Music. Your Stats.
          </span>
          <span className="text-5xl max-sm:text-3xl font-semibold text-slate-200 dark:text-[rgb(49,0,67)]">
            All in one place.
          </span>
        </div>
        <TabsContainer />
      </main>
      <Footer />
    </>
  );
}
