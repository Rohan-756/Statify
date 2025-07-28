import React, { useEffect, useState } from 'react';
import "../stats.css";
import { Button } from '@/components/ui/button';
import DonutChart from './DonutChart';

type ArtistImage = {
    url: string;
};

type ExternalUrls = {
    spotify: string;
};

type Artist = {
    name: string;
    images: ArtistImage[];
    external_urls: ExternalUrls;
    genres: string[];
};

const TopArtists = ({ timeRange }: { timeRange: string }) => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [genreCount, setGenreCount] = useState<Record<string, number>>({});
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

                // ✅ Properly compute genre counts from fresh data
                const genreTally: Record<string, number> = {};
                data.items.forEach((artist: Artist) => {
                    artist.genres.forEach((genre: string) => {
                        genreTally[genre] = (genreTally[genre] || 0) + 1;
                    });
                });

                setGenreCount(genreTally);
            })
            .catch((err) => {
                console.error('Error fetching top artists:', err);
                setLoading(false);
                setError(true);
            });
    }, [timeRange]);

    return (
        <>
            <h1 className="ml-2 m-3 lg:text-3xl md:text-3xl sm:text-3xl max-sm:text-2xl text-slate-800 dark:text-white">
                Your Top Genres.
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
                        <Button className="rounded-full bg-[#1ed760] hover:bg-[#1db954] active:bg-[#1db954] cursor-pointer mt-4">
                            Login again
                        </Button>
                    </a>
                </div>
            ) : (
                <>
                    {/* ✅ Uncomment this when DonutChart is ready */}
                    <DonutChart genreCount={genreCount} />

                    <div className="text-2xl font-semibold text-slate-800 dark:text-white w-full text-center mb-8 mt-10">
                        That's It For Now!
                    </div>
                </>
            )}
        </>
    );
};

export default TopArtists;
