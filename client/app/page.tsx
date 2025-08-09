// import Footer from "@/components/Footer";
// import NavBar from "@/components/NavBar";
// import TopShadow from "@/components/TopShadow";
// import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";

// export default function Home() {
//   return (
//     <>

//       {/* top gradient */}

//       <TopShadow/>

//       {/* nav bar */}

//       <NavBar login="true"/>

//       {/* header line */}

//       <div className="mx-auto w-fit my-[80px] text-slate-800 dark:text-white">
//         <h1 className="text-8xl md:text-4xl sm:text-4xl max-sm:text-[7vw] flex flex-col justify-center items-start">
//           <span>Get to know your</span>
//           <div className="flex gap-2 items-center">
//             <img className="w-auto h-15 md:h-12 sm:h-12 max-sm:h-[10vw]" src="spotify-logo.png" />
//             <span>stats — For Free</span>
//           </div>
//         </h1>
//       </div>

//       {/* grid box */}

//       <div className="grid grid-cols-2 gap-6 gap-y-8 mx-auto w-3/4 max-w-[800px] my-[20px] max-sm:grid-cols-1">
//         {/* text line 1 */}
//         <div className="text-slate-800 dark:text-white min-lg:text-xl md:text-lg font-semibold text-justify flex flex-col justify-center max-sm:order-2">
//           <span className="text-2xl min-lg:text-4xl font-semibold mb-[2px]">Your music taste is one of a kind.</span>
//           Dive into your stats, explore your most played tracks, discover hidden gems,
//           and see how your listening habits evolve — all in one place, beautifully visualized
//         </div>
//         {/* image 1 */}
//         <div className="max-sm:order-1"><img className=" rounded-xl  dark:shadow-2xl  dark:shadow-slate-800" src="man_listening_songs.jpg"></img></div>
//         {/* image 2 */}
//         <div className="max-sm:order-3"><img className=" rounded-xl  dark:shadow-2xl  dark:shadow-slate-800" src="woman_listening_songs.jpg"></img></div>
//         {/* text line 2 */}
//         <div className="text-slate-800 dark:text-white min-lg:text-xl md:text-lg font-semibold text-justify flex flex-col justify-center max-sm:order-4">
//           <span className="text-2xl min-lg:text-4xl font-semibold mb-[2px]">Connect your Spotify to begin.</span>
//           We'll pull in your listening data securely and give you a fresh,
//           fun look at your music story — no playlists touched, just insights delivered.
//           {/* Login button */}
//           <a href="http://localhost:4000/login">
//             <Button className=" text-md p-[10px] font-semibold 
//             rounded-full bg-[#1ed760] hover:bg-[#1db954] cursor-pointer active:bg-[#1db954] col-2 mx-auto
//             flex justify-center items-center w-2/3 h-min min-w-fit mt-8">
//               Discover yourself!
//               <ArrowRight />
//             </Button>
//           </a>
//         </div>
//       </div>

//       {/* footer */}

//       <Footer />


//     </>
//   );
// }


{/* SEO */}

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import TopShadow from "@/components/TopShadow";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <TopShadow />
      <NavBar login="true" />

      <main>
        {/* Hero Section */}
        <header className="mx-auto w-fit my-[80px] text-slate-800 dark:text-white text-center">
          <h1 className="text-8xl md:text-4xl sm:text-4xl max-sm:text-[5.5vw] flex flex-col items-start">
            <span>Get to know your</span>
            <div className="flex gap-2 items-center">
              <Image
                src="/spotify-logo.png"
                alt="Spotify logo"
                width={90}
                height={60}
                className="w-auto h-15 md:h-12 sm:h-12 max-sm:h-[8.5vw]"
              />
              <span>Spotify stats — For Free</span>
            </div>
          </h1>
        </header>

        {/* Features Grid */}
        <section
          className="grid grid-cols-2 gap-6 gap-y-8 mx-auto w-3/4 max-w-[800px] my-[20px] max-sm:grid-cols-1"
          aria-label="Spotify stats features"
        >
          {/* Feature 1 */}
          <div className="text-slate-800 dark:text-white min-lg:text-xl md:text-lg font-semibold text-justify flex flex-col justify-center max-sm:order-2">
            <h2 className="text-2xl min-lg:text-4xl font-semibold mb-[2px]">
              Your music taste is one of a kind.
            </h2>
            <p>
              Dive into your stats, explore your most played tracks, discover hidden gems,
              and see how your listening habits evolve — all in one place, beautifully visualized.
            </p>
          </div>
          <div className="max-sm:order-1">
            <Image
              src="/man_listening_songs.jpg"
              alt="Person listening to music on headphones"
              width={500}
              height={350}
              className="rounded-xl dark:shadow-2xl dark:shadow-slate-800"
            />
          </div>

          {/* Feature 2 */}
          <div className="max-sm:order-3">
            <Image
              src="/woman_listening_songs.jpg"
              alt="Woman enjoying her favorite songs"
              width={500}
              height={350}
              className="rounded-xl dark:shadow-2xl dark:shadow-slate-800"
            />
          </div>
          <div className="text-slate-800 dark:text-white min-lg:text-xl md:text-lg font-semibold text-justify flex flex-col justify-center max-sm:order-4">
            <h2 className="text-2xl min-lg:text-4xl font-semibold mb-[2px]">
              Connect your Spotify to begin.
            </h2>
            <p>
              We'll pull in your listening data securely and give you a fresh,
              fun look at your music story — no playlists touched, just insights delivered.
            </p>
            <a href="http://localhost:4000/login" aria-label="Connect your Spotify account to start viewing stats">
              <Button
                className="text-md p-[10px] font-semibold rounded-full bg-[#1ed760] hover:bg-[#1db954] cursor-pointer active:bg-[#1db954] mx-auto flex justify-center items-center w-2/3 min-w-fit mt-8"
              >
                Discover yourself!
                <ArrowRight />
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
