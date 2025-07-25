'use client'; // only needed in app router

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
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
      <div className="w-screen h-0 shadow-[0_0_200px_150px] shadow-[rgb(174,0,255)] dark:shadow-[#a955f7ea] fixed -z-2"></div>
      <NavBar/>
      <h1>Stats Page</h1>
      {
        tracks.map((track,index)=>(
          <li key={index}>{`${track.name} ${track.artists.map(artist => artist.name)}`}</li>
        ))
      }
      <Footer/>
    </div>
  );
}
