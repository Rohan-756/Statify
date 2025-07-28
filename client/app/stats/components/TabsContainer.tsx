"use client";

import { useState } from "react";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";
import TopGenres from "./TopGenres";

const timeRangeLabels = {
  short_term: "Past Month",
  medium_term: "6 Months",
  long_term: "All Time",
};

const getNextRange = (current: string): string => {
  if (current === "short_term") return "medium_term";
  if (current === "medium_term") return "long_term";
  return "short_term";
};

export default function TabsContainer() {
  const [activeTab, setActiveTab] = useState("Top Tracks");
  const [timeRange, setTimeRange] = useState<"short_term" | "medium_term" | "long_term">("medium_term");

  const handleTimeRangeToggle = () => {
    setTimeRange((prev) => getNextRange(prev) as typeof timeRange);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      {/* Tabs */}
      <div className="flex justify-center items-center py-1 w-min backdrop-blur-2xl
       bg-[rgba(228,228,228,0.6)] dark:bg-[rgba(0,0,0,0.5)] z-2 mx-auto
       rounded-lg sticky lg:top-18 md:top-17 sm:top-16 max-sm:top-14.5">

        {["Top Tracks", "Top Artists","Top Genres"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-1 px-2 mx-4 font-medium whitespace-nowrap min-h-9 max-sm:mx-1 max-sm:text-xs cursor-pointer 
              ${activeTab === tab
              ? "text-slate-800 dark:text-white pt-1.5 border-b-3 border-[rgb(129,0,189)] dark:border-[#1ed760] max-sm:pt-1.75"
              : "text-slate-800 dark:text-white"
              }`}>
            {tab}
          </button>
        ))}
        <button
          onClick={handleTimeRangeToggle}
          className="py-1 px-4 mx-4 mr-0 whitespace-nowrap h-min min-w-29.5 max-sm:min-w-22 max-sm:mx-1 max-sm:mr-0 max-sm:text-xs
           text-center font-medium text-[rgb(80,0,117)] dark:text-[#1ed760] max-sm:px-2
          border-[rgba(255,255,255,0.4)] dark:border-[rgba(124,124,124,0.5)] border-l-2 cursor-pointer"
        >
          {timeRangeLabels[timeRange]}
        </button>
      </div>

      {/* Content */}
      <div className="mt-4 p-2 pt-1">
        {activeTab === "Top Tracks" && <TopTracks timeRange={timeRange} />}
        {activeTab === "Top Artists" && <TopArtists timeRange={timeRange} />}
        {activeTab === "Top Genres" && <TopGenres timeRange={timeRange} />}
      </div>
    </div>
  );
}
