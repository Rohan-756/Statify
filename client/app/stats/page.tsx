'use client'

// import { useEffect, useState } from 'react'

// type Track = {
//   name: string
//   artist: string
//   album: string
//   image: string
// }

// export default function StatsPage() {
//   const [tracks, setTracks] = useState<Track[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchTopTracks = async () => {
//       try {
//         const res = await fetch('/api/top-tracks', {
//           method:"GET",
//           credentials: 'include', // if cookies or auth are involved
//         })
//         if (!res.ok) throw new Error('Failed to fetch tracks')
//         const data = await res.json()
//         setTracks(data.tracks) // assuming your backend returns { tracks: [...] }
//       } catch (err: any) {
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchTopTracks()
//   }, [])

//   if (loading) return <div className="p-4">Loading...</div>
//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>

//   return (
//     <div className="p-4 dark:bg-black min-h-screen text-white">
//       <h1 className="text-2xl font-bold mb-4">Your Top Tracks</h1>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {tracks.map((track, index) => (
//           <div
//             key={index}
//             className="bg-zinc-900 p-4 rounded-xl shadow hover:bg-zinc-800 transition"
//           >
//             <img
//               src={track.image}
//               alt={track.name}
//               className="w-full h-48 object-cover rounded-md mb-2"
//             />
//             <h2 className="text-lg font-semibold">{track.name}</h2>
//             <p className="text-sm text-zinc-400">{track.artist}</p>
//             <p className="text-sm text-zinc-500 italic">{track.album}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


// import React, { useEffect } from 'react'

// const page = () => {
//   useEffect
//   return (
//     <>
//       <div className="dark:text-blue-200 text-blue-900">page</div>
//     </>

//   )
// }

// export default page

'use client'; // only needed in app router

import { useEffect, useState } from 'react';

export default function StatsPage() {
const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch('/api/top-tracks', {
      method: 'GET',
      credentials: 'include', // This tells the browser to send cookies
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Received from /testing:', data);
        // const names= Object.values(data.items).map(item => item.name);
        setTracks(data.items);
      })
      .catch((err) => {
        console.error('Error fetching /testing:', err);
      });
  }, []);

  return (
    <div>
      <h1>Stats Page</h1>
      {
        tracks.map((track,index)=>(
          <li key={index}>{`${track.name} ${track.artists.map(artist => artist.name)}`}</li>
        ))
      }
    </div>
  );
}
