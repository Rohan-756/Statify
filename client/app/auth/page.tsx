"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import './auth.css'

const Page = () => {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/callback?code=${code}`, {
                    method: "GET",
                    credentials: "include", // ✅ ensures cookies are sent and received
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                // const data = await response.json();
                console.log("Authentication complete");
                router.push("/stats")
            } catch (err) {
                console.error("Authentication failed", err);
            }
        };

        fetchUserData();
    }, []);



    return (
        <>

            {/* shadow effect */}

            <div className="w-full h-0 shadow-[0_0_300px_150px_rgba(0,0,0,0.5)]
            fixed -z-2 shadow-[#c800ff] topShadow"></div>
            {/* authenticating message */}
            <div className="text-white flex flex-col justify-center items-center w-screen h-screen">
                <div className="spinning-disk"></div>
                <div className="text-2xl font-semibold">Authenticating.</div>
                <div className="text-xl font-semibold">Please Wait...</div>
            </div>

        </>)
};

export default Page;

