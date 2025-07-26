"use client"

import { useState } from "react";
import TopTracks from "./TopTracks";

export default function TabsContainer() {
  const [activeTab, setActiveTab] = useState("Top Tracks");


  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      {/* Tabs */}
      <div className="flex justify-center py-1 w-min backdrop-blur-2xl
       bg-[rgba(228,228,228,0.45)] dark:bg-[rgba(0,0,0,0.5)] z-2 mx-auto
       rounded-lg sticky lg:top-18 md:top-17 sm:top-16 max-sm:top-14.5">

        {["Top Tracks", "Top Artists", "Top Albums"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-1 px-2 mx-4 font-medium whitespace-nowrap min-h-9 max-sm:mx-2 max-sm:text-sm ${activeTab === tab ? " text-slate-800 dark:text-white border-b-3 border-white dark:border-[#1ed760]"
                : "text-slate-800 dark:text-white"
              }`}
          // border-[#1ed760] text-[#1ed760]
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-4 p-2 pt-1">
        {activeTab === "Top Tracks" &&
          <TopTracks />
        }
        {activeTab === "Top Artists" &&
          <p>Your music stats will appear here.</p>
        }
        {activeTab === "Top Albums" &&
          <p>Playlists go here.</p>
        }
      </div>
    </div>
  );
}
