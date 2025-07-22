"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/callback?code=${code}`, {
          method: "GET",
          credentials: "include", // ✅ ensures cookies are sent and received
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // const data = await response.json();
        // console.log("User data:", data); // ✅ Logs data
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchUserData();
  }, []);



  return <div className="text-white">Authenticating...</div>;
};

export default Page;

