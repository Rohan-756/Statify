'use client'; // only needed in app router

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import TopShadow from '@/components/TopShadow';
import TopTracks from './TopTracks';
import {React, useState, useEffect} from "react";

export default function StatsPage() {
  
  return (
    <>

      {/* top shdaow */}

      <TopShadow />

      {/* navbar */}

      <NavBar login="hidden" className="" ></NavBar>

      {/* main body */}

      <main className="">
        {/* header line */}
        <div className="mt-30 flex flex-col px-3">
          <span className="lg:text-5xl md:text-5xl sm:text-4xl max-sm:text-3xl font-semibold text-slate-800 dark:text-white">Your Music. Your Stats.</span>
          <span className="lg:text-5xl md:text-5xl sm:text-4xl max-sm:text-3xl font-semibold text-slate-200 dark:text-[rgb(61,34,71)]">All in one place.</span>
        </div>
        {/* output data */}
        <TopTracks/>
      </main>

      <Footer />
    </>
  );
}
