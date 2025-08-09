// import React, { useEffect, useState } from 'react'
// import "../stats.css"
// import { Button } from '@/components/ui/button';

// type Artist = {
//     name: string;
// }

// type AlbumImage = {
//     url: string;
// }

// type Album = {
//     images: AlbumImage[];
// }

// type ExternalUrls = {
//     spotify: string;
// }

// type Track = {
//     name: string;
//     artists: Artist[];
//     album: Album;
//     external_urls: ExternalUrls;
// }

// type TopTracksProps = {
//     timeRange: "short_term" | "medium_term" | "long_term";
// }

// const TopTracks = ({ timeRange }: TopTracksProps) => {
//     const [tracks, setTracks] = useState<Track[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         fetch(`/api/top-tracks?time_range=${timeRange}`, {
//             method: 'GET',
//             credentials: 'include',
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 if (!Array.isArray(data.items) || data.items.length === 0) {
//                     throw new Error("Invalid or empty data");
//                 }
//                 setTracks(data.items);
//                 setLoading(false);
//                 setError(false);
//             })
//             .catch((err) => {
//                 console.error('Error fetching top tracks:', err);
//                 setLoading(false);
//                 setError(true);
//             });
//     }, [timeRange]);

//     return (
//         <>
//             <h1 className="ml-2 m-3 lg:text-3xl md:text-3xl sm:text-3xl max-sm:text-2xl text-slate-800 dark:text-white">
//                 Your Top Tracks.
//             </h1>
//             {loading ? (
//                 <div className="flex flex-col items-center justify-center mt-8 w-full h-[50vh]">
//                     <div className="spinning-disk"></div>
//                     <div className="text-xl text-slate-800 dark:text-white">Loading...</div>
//                 </div>
//             ) : error ? (
//                 <div className="flex flex-col items-center mt-8 w-full h-screen">
//                     <div className="text-xl font-semibold text-red-500 TRANS_OFF">Failed to load top tracks.</div>
//                     <div className="text-slate-800 dark:text-white text-lg font-semibold">Please login again.</div>
//                     <a href="/api/login">
//                     <Button className="rounded-full bg-[#1ed760] hover:bg-[#1db954]
//                     active:bg-[#1db954] cursor-pointer mt-4 ">Login again</Button>
//                 </a>
//                 </div>
//             ) : (
//                 <>
//                     <div className="mt-3">
//                         {tracks.map((track, index) => (
//                             <li
//                                 key={index}
//                                 className={`flex m-2 whitespace-nowrap items-center justify-start gap-4 
//                                 rounded-md p-2 backdrop-blur-md z-1 
//                                 ${index===0 ? "bg-[rgba(212,175,55,0.8)] dark:bg-[rgb(212,175,55,0.7)]" 
//                                 : index===1 ? "bg-[rgb(170,169,173,0.85)] dark:bg-[rgb(170,169,173,0.7)]"
//                                 : index===2 ? "bg-[rgba(110,78,32,0.8)] dark:bg-[rgb(110,78,32,0.7)]"
//                                 : "bg-[rgba(210,210,210,0.5)] dark:bg-[rgba(68,68,68,0.5)]"}`}>
//                                 <div className="text-center min-w-5">{index + 1}</div>
//                                 <img
//                                     className="w-[64px] h-[64px] max-sm:w-[50px] max-sm:h-[50px] rounded-sm"
//                                     src={track.album.images[1]?.url || track.album.images[0]?.url || ""}
//                                     alt="Album Art"
//                                 />
//                                 <div className="flex flex-col overflow-hidden text-ellipsis flex-1">
//                                     <a
//                                         href={track.external_urls.spotify}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-slate-900 dark:text-white"
//                                     >
//                                         <span className="font-medium overflow-hidden text-ellipsis hover:underline active:underline cursor-pointer">
//                                             {track.name}
//                                         </span>
//                                     </a>
//                                     <span className="overflow-hidden text-ellipsis text-slate-800 dark:text-gray-200">
//                                         {track.artists.map(artist => artist.name).join(", ")}
//                                     </span>
//                                 </div>
//                             </li>
//                         ))}
//                     </div>
//                     <div className="text-2xl font-semibold text-slate-800 dark:text-white w-full text-center mb-8 mt-15">
//                         That's It For Now!
//                     </div>
//                 </>
//             )}
//         </>
//     );
// };

// export default TopTracks;


/* SEO */


import React, { useEffect, useState } from 'react';
import "../stats.css";
import { Button } from '@/components/ui/button';

type Artist = { name: string };
type AlbumImage = { url: string };
type Album = { images: AlbumImage[] };
type ExternalUrls = { spotify: string };

type Track = {
    name: string;
    artists: Artist[];
    album: Album;
    external_urls: ExternalUrls;
};

type TopTracksProps = {
    timeRange: "short_term" | "medium_term" | "long_term";
};

const TopTracks = ({ timeRange }: TopTracksProps) => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`/api/top-tracks?time_range=${timeRange}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                if (!Array.isArray(data.items) || data.items.length === 0) {
                    throw new Error("Invalid or empty data");
                }
                setTracks(data.items);
                setLoading(false);
                setError(false);
            })
            .catch((err) => {
                console.error('Error fetching top tracks:', err);
                setLoading(false);
                setError(true);
            });
    }, [timeRange]);

    return (
        <>
            <h1 className="ml-2 m-3 lg:text-3xl md:text-3xl sm:text-3xl max-sm:text-2xl text-slate-800 dark:text-white">
                Your Top Tracks
            </h1>

            {loading ? (
                <div className="flex flex-col items-center justify-center mt-8 w-full h-[50vh]">
                    <div className="spinning-disk"></div>
                    <div className="text-xl text-slate-800 dark:text-white">Loading...</div>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center mt-8 w-full h-screen">
                    <div className="text-xl font-semibold text-red-500 TRANS_OFF">Failed to load top tracks.</div>
                    <div className="text-slate-800 dark:text-white text-lg font-semibold">Please login again.</div>
                    <a href="/api/login">
                        <Button className="rounded-full bg-[#1ed760] hover:bg-[#1db954] active:bg-[#1db954] cursor-pointer mt-4">
                            Login again
                        </Button>
                    </a>
                </div>
            ) : (
                <>
                    <ol className="mt-3 space-y-3 px-2">
                        {tracks.map((track, index) => (
                            <li
                                key={index}
                                className={`flex items-center gap-4 rounded-lg p-3 backdrop-blur-md shadow-sm transition-all hover:shadow-md 
                                    ${index === 0
                                        ? "bg-[rgba(212,175,55,0.8)] dark:bg-[rgb(212,175,55,0.7)]"
                                        : index === 1
                                            ? "bg-[rgb(170,169,173,0.85)] dark:bg-[rgb(170,169,173,0.7)]"
                                            : index === 2
                                                ? "bg-[rgba(110,78,32,0.8)] dark:bg-[rgb(110,78,32,0.7)]"
                                                : "bg-[rgba(210,210,210,0.5)] dark:bg-[rgba(68,68,68,0.5)]"
                                    }`}
                            >
                                <div className="text-center w-6 font-semibold text-slate-700 dark:text-gray-200">
                                    {index + 1}
                                </div>
                                <img
                                    className="w-[64px] h-[64px] max-sm:w-[50px] max-sm:h-[50px] rounded-md shadow-sm"
                                    src={track.album.images[1]?.url || track.album.images[0]?.url || ""}
                                    alt={`${track.name} Album Art`}
                                />
                                <div className="flex flex-col overflow-hidden flex-1">
                                    <a
                                        href={track.external_urls.spotify}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-900 dark:text-white font-medium truncate hover:underline w-min"
                                    >
                                        {track.name}
                                    </a>
                                    <span className="text-slate-700 dark:text-gray-300 text-sm truncate w-min">
                                        {track.artists.map(artist => artist.name).join(", ")}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <div className="text-2xl font-semibold text-slate-800 dark:text-white w-full text-center mb-8 mt-12">
                        That&apos;s It For Now!
                    </div>
                </>
            )}
        </>
    );
};

export default TopTracks;
