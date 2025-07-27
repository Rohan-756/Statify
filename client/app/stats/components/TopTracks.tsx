import React, { useEffect, useState } from 'react'
import "../stats.css"

type Artist = {
    name: string;
}

type AlbumImage = {
    url: string;
}

type Album = {
    images: AlbumImage[];
}

type ExternalUrls = {
    spotify: string;
}

type Track = {
    name: string;
    artists: Artist[];
    album: Album;
    external_urls: ExternalUrls;
}

const TopTracks = () => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/top-tracks', {
            method: 'GET',
            credentials: 'include', // This tells the browser to send cookies
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log('Received from /testing:', data);
                // const names= Object.values(data.items).map(item => item.name);
                setTracks(data.items || []);
                // console.log(tracks);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching /testing:', err);
                setLoading(false);
            });
    }, []);
    return (
        <>
            {/* top tracks heading */}
            <h1 className="m-3 lg:text-3xl md:text-3xl sm:text-3xl max-sm:text-2xl text-slate-800 dark:text-white">Your Top Tracks.</h1>
            {/* list of items */}
            {
                (!loading) ?
                    <>
                        <div className="mt-3">
                            {
                                tracks.map((track, index) => (
                                    <li key={index} className="flex m-2 whitespace-nowrap items-center justify-start gap-4 bg-[rgba(215,215,215,0.4)] dark:bg-[rgba(68,68,68,0.5)] rounded-md p-2 backdrop-blur-md z-1">
                                        <div className="text-center min-w-5 ">{++index}</div>
                                        <img className="w-[64px] h-[64px] max-sm:w-[50px] rounded-sm" src={track.album.images[1].url} />
                                        <div className="flex flex-col overflow-hidden text-ellipsis">
                                            <a href={track.external_urls.spotify} target="_blank" className="text-slate-900 dark:text-white">
                                                <span className="overflow-hidden text-ellipsis hover:underline active:underline cursor-pointer">
                                                    {track.name}
                                                </span>
                                            </a>
                                            <span className="overflow-hidden text-ellipsis text-slate-800 dark:text-white">
                                                {track.artists.map(artist => artist.name).join(", ")}
                                            </span></div>
                                    </li>
                                ))
                            }
                        </div>
                        <div className="text-2xl font-semibold text-slate-800 dark:text-white
               w-full text-center mb-8 mt-15">That's It For Now!</div>
                    </>
                    : <>
                        <div className="flex flex-col items-center  mt-8 w-full h-screen">
                            <div className="spinning-disk"></div>
                            <div className="text-xl text-slate-800 dark:text-white">Loading...</div>
                        </div>
                    </>
            }
        </>
    )
}

export default TopTracks