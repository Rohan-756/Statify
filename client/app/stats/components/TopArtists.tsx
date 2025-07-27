// import React, { useEffect, useState } from 'react'
// import "../stats.css"
// import { Button } from '@/components/ui/button';

// type ArtistImage = {
//     url: string;
// }

// type ExternalUrls = {
//     spotify: string;
// }

// type Artist = {
//     name: string;
//     images: ArtistImage[];
//     external_urls: ExternalUrls;
//     genres: string[];
// }

// const TopArtists = ({ timeRange }: { timeRange: string }) => {
//     const [artists, setArtists] = useState<Artist[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         fetch('/api/top-artists', {
//             method: 'GET',
//             credentials: 'include',
//         })
//             .then((res) => {
//                 if (!res.ok) throw new Error('Failed to fetch');
//                 return res.json();
//             })
//             .then((data) => {
//                 if (!data?.items || !Array.isArray(data.items) || data.items.length === 0) {
//                     throw new Error("Invalid or empty data");
//                 }
//                 setArtists(data.items);
//                 setLoading(false);
//                 setError(false);
//             })
//             .catch((err) => {
//                 console.error('Error fetching top artists:', err);
//                 setLoading(false);
//                 setError(true);
//             });
//     }, []);

//     return (
//         <>
//             <h1 className="m-3 lg:text-3xl md:text-3xl sm:text-3xl max-sm:text-2xl text-slate-800 dark:text-white">
//                 Your Top Artists
//             </h1>

//             {loading ? (
//                 <div className="flex flex-col items-center mt-8 w-full h-screen">
//                     <div className="spinning-disk"></div>
//                     <div className="text-xl text-slate-800 dark:text-white">Loading...</div>
//                 </div>
//             ) : error ? (
//                 <div className="flex flex-col items-center mt-8 w-full h-screen">
//                     <div className="text-xl font-semibold text-red-500 TRANS_OFF">Failed to load top artists.</div>
//                     <div className="text-slate-800 dark:text-white text-lg font-semibold">Please login again.</div>
//                     <a href="/api/login">
//                     <Button className="rounded-full bg-[#1ed760] hover:bg-[#1db954]
//                     active:bg-[#1db954] cursor-pointer mt-4">Login again</Button>
//                 </a>
//                 </div>
//                 ) : (
//                 <>
//                     <div className="mt-3">
//                         {artists.map((artist, index) => (
//                             <li
//                                 key={index}
//                                 className="flex m-2 whitespace-nowrap items-center justify-start gap-4 bg-[rgba(215,215,215,0.4)] dark:bg-[rgba(68,68,68,0.5)] rounded-md p-2 backdrop-blur-md z-1"
//                             >
//                                 <div className="text-center min-w-5">{index + 1}</div>
//                                 <img
//                                     className="w-[64px] h-[64px] max-sm:w-[50px] max-sm:h-[50px] rounded-sm"
//                                     src={artist.images?.[2]?.url || artist.images?.[0]?.url || ""}
//                                     alt={artist.name}
//                                 />
//                                 <div className="flex flex-col overflow-hidden text-ellipsis">
//                                     <a
//                                         href={artist.external_urls.spotify}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-slate-800 dark:text-white"
//                                     >
//                                         <span className="font-medium overflow-hidden text-ellipsis hover:underline active:underline cursor-pointer">
//                                             {artist.name}
//                                         </span>
//                                     </a>
//                                     <span className="text-sm text-slate-700 dark:text-gray-300 overflow-hidden text-ellipsis">
//                                         {artist.genres?.join(", ").toUpperCase() || "No genres available"}
//                                     </span>
//                                 </div>
//                             </li>
//                         ))}
//                     </div>
//                     <div className="text-2xl font-semibold text-slate-800 dark:text-white w-full text-center mb-8 mt-10">
//                         That's It For Now!
//                     </div>
//                 </>
//             )}
//         </>
//     );
// };

// export default TopArtists;

import React, { useEffect, useState } from 'react'
import "../stats.css"
import { Button } from '@/components/ui/button';

type ArtistImage = {
    url: string;
}

type ExternalUrls = {
    spotify: string;
}

type Artist = {
    name: string;
    images: ArtistImage[];
    external_urls: ExternalUrls;
    genres: string[];
}

const TopArtists = ({ timeRange }: { timeRange: string }) => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`/api/top-artists?time_range=${timeRange}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then((data) => {
                if (!data?.items || !Array.isArray(data.items) || data.items.length === 0) {
                    throw new Error("Invalid or empty data");
                }
                setArtists(data.items);
                setLoading(false);
                setError(false);
            })
            .catch((err) => {
                console.error('Error fetching top artists:', err);
                setLoading(false);
                setError(true);
            });
    }, [timeRange]);

    return (
        <>
            <h1 className="m-3 lg:text-3xl md:text-3xl sm:text-3xl max-sm:text-2xl text-slate-800 dark:text-white">
                Your Top Artists
            </h1>

            {loading ? (
                <div className="flex flex-col items-center justify-center mt-8 w-full h-[50vh]">
                    <div className="spinning-disk"></div>
                    <div className="text-xl text-slate-800 dark:text-white">Loading...</div>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center mt-8 w-full h-screen">
                    <div className="text-xl font-semibold text-red-500 TRANS_OFF">Failed to load top artists.</div>
                    <div className="text-slate-800 dark:text-white text-lg font-semibold">Please login again.</div>
                    <a href="/api/login">
                        <Button className="rounded-full bg-[#1ed760] hover:bg-[#1db954]
                        active:bg-[#1db954] cursor-pointer mt-4">Login again</Button>
                    </a>
                </div>
            ) : (
                <>
                    <div className="mt-3">
                        {artists.map((artist, index) => (
                            <li
                                key={index}
                                className={`flex m-2 whitespace-nowrap items-center justify-start gap-4 
                                rounded-md p-2 backdrop-blur-md z-1 
                                ${index===0 ? "bg-[rgba(212,175,55,0.8)] dark:bg-[rgb(212,175,55,0.7)]" 
                                : index===1 ? "bg-[rgb(170,169,173,0.85)] dark:bg-[rgb(170,169,173,0.7)]"
                                : index===2 ? "bg-[rgba(110,78,32,0.8)] dark:bg-[rgb(110,78,32,0.7)]"
                                : "bg-[rgba(215,215,215,0.4)] dark:bg-[rgba(68,68,68,0.5)]"}`}>
                                <div className="text-center min-w-5">{index + 1}</div>
                                <img
                                    className="w-[64px] h-[64px] max-sm:w-[50px] max-sm:h-[50px] rounded-sm"
                                    src={artist.images?.[2]?.url || artist.images?.[0]?.url || ""}
                                    alt={artist.name}
                                />
                                <div className="flex flex-col overflow-hidden text-ellipsis">
                                    <a
                                        href={artist.external_urls.spotify}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-800 dark:text-white"
                                    >
                                        <span className="font-medium overflow-hidden text-ellipsis hover:underline active:underline cursor-pointer">
                                            {artist.name}
                                        </span>
                                    </a>
                                    <span className="text-sm text-slate-700 dark:text-gray-300 overflow-hidden text-ellipsis">
                                        {artist.genres?.join(", ").toUpperCase() || "No genres available"}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </div>
                    <div className="text-2xl font-semibold text-slate-800 dark:text-white w-full text-center mb-8 mt-10">
                        That's It For Now!
                    </div>
                </>
            )}
        </>
    );
};

export default TopArtists;

