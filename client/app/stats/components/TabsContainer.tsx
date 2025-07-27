// "use client"

// import { useState } from "react";
// import TopTracks from "./TopTracks";
// import TopArtists from "./TopArtists";

// export default function TabsContainer() {
//   const [activeTab, setActiveTab] = useState("Top Tracks");


//   return (
//     <div className="w-full max-w-2xl mx-auto mt-10">
//       {/* Tabs */}
//       <div className="flex justify-center py-1 w-min backdrop-blur-2xl
//        bg-[rgba(228,228,228,0.45)] dark:bg-[rgba(0,0,0,0.5)] z-2 mx-auto
//        rounded-lg sticky lg:top-18 md:top-17 sm:top-16 max-sm:top-14.5">

//         {["Top Tracks", "Top Artists", "Top Albums"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`py-1 px-2 mx-4 font-medium whitespace-nowrap min-h-9 max-sm:mx-2 max-sm:text-sm ${activeTab === tab ? " text-slate-800 dark:text-white border-b-3 border-white dark:border-[#1ed760]"
//                 : "text-slate-800 dark:text-white"
//               }`}
//           // border-[#1ed760] text-[#1ed760]
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="mt-4 p-2 pt-1">
//         {activeTab === "Top Tracks" &&
//           <TopTracks />
//         }
//         {activeTab === "Top Artists" &&
//           <TopArtists/>
//         }
//         {activeTab === "Top Albums" &&
//           <p>Playlists go here.</p>
//         }
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";

const timeRangeLabels = {
  short_term: "Past Month",
  medium_term: "6 Months",
  long_term: "Lifetime",
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
       bg-[rgba(228,228,228,0.45)] dark:bg-[rgba(0,0,0,0.5)] z-2 mx-auto
       rounded-lg sticky lg:top-18 md:top-17 sm:top-16 max-sm:top-14.5">

        {["Top Tracks", "Top Artists"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-1 px-2 mx-4 font-medium whitespace-nowrap min-h-9 max-sm:mx-2 max-sm:text-sm ${activeTab === tab
              ? "text-slate-800 dark:text-white border-b-3 border-white dark:border-[#1ed760]"
              : "text-slate-800 dark:text-white"
              }`}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={handleTimeRangeToggle}
          className="py-1 px-4 mx-4 mr-0 whitespace-nowrap h-min min-w-29.5 max-sm:min-w-27 max-sm:mx-2 max-sm:mr-0 max-sm:text-sm text-center font-medium
          text-[rgb(73,0,106)] dark:text-[#1ed760] border-[rgba(255,255,255,0.4)] dark:border-[rgba(124,124,124,0.5)] border-l-2"
        >
          {timeRangeLabels[timeRange]}
        </button>
      </div>

      {/* Content */}
      <div className="mt-4 p-2 pt-1">
        {activeTab === "Top Tracks" && <TopTracks timeRange={timeRange} />}
        {activeTab === "Top Artists" && <TopArtists timeRange={timeRange} />}
      </div>
    </div>
  );
}
