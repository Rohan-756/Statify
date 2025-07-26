
import { useState } from "react";
import TopTracks from "./TopTracks";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Tabs */}
      <div className="flex justify-center">
        {["Top Tracks", "Top Artists", "Top Albums"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 font-medium TRANS_OFF ${
              activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-slate-800 dark:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-4 p-2 pt-1">
        {activeTab === "Top Tracks" &&
         <TopTracks/>
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
