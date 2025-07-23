"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import './auth.css';
import { ShieldAlert } from "lucide-react";

const Page = () => {
    const searchParams = useSearchParams();
    /* get code param from URL */
    const code = searchParams.get("code");
    const router = useRouter();

    /* error variable */
    const [error, setError] = useState(false);

    /* fetch cookies from backend */
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/callback?code=${code}`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                console.log("Authentication complete");
                router.push("/stats");
            } catch (err) {
                console.error("Authentication failed", err);
                setError(true); // 👈 Show error message
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            {/* shadow effect */}
            <div className="w-full h-0 shadow-[0_0_300px_150px_rgba(0,0,0,0.5)] fixed -z-2 shadow-[#c800ff] topShadow"></div>

            {/* message container */}
            <div className="text-white flex flex-col justify-center items-center w-screen h-screen">
                {error ? (
                    <>
                        {/* in case of error */}
                        <ShieldAlert className="w-[100px] h-[100px] mb-[20px]"/>
                        <div className="text-2xl font-semibold text-red-500">Authentication Failed</div>
                        <div className="text-xl font-semibold">Please try again.</div>
                    </>
                ) : (
                    <>
                        {/* if no error */}
                        <div className="spinning-disk"></div>
                        <div className="text-2xl font-semibold">Authenticating.</div>
                        <div className="text-xl font-semibold">Please Wait...</div>
                    </>
                )}
            </div>
        </>
    );
};

export default Page;
