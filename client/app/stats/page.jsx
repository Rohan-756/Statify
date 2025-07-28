; // only needed in app router

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import TopShadow from '@/components/TopShadow';
import React from "react";
import TabsContainer from './components/TabsContainer';

export default function StatsPage() {
  
  return (
    <>

      {/* top shdaow */}

      <TopShadow />

      {/* navbar */}

      <NavBar login="hidden"/>

      {/* main body */}

      <main className="w-full h-full">
        {/* header line */}
        <div className="w-full max-w-2xl mt-30 flex flex-col px-3 items-start justify-center mx-auto">
          <span className="text-5xl max-sm:text-3xl font-semibold text-slate-800 dark:text-white">Your Music. Your Stats.</span>
          <span className="text-5xl max-sm:text-3xl font-semibold text-slate-200 dark:text-[rgb(49,0,67)]">All in one place.</span>
        </div>
        {/* output data */}
        <TabsContainer/>
      </main>

      <Footer className=""/>
    </>
  );
}
