import { Button } from "@/components/ui/button";
import { ArrowRight, Menu } from "lucide-react";

export default function Home() {
  return (
    <>

      {/* top gradient */}

      <div className="w-screen h-0 shadow-[0_0_200px_150px] shadow-[#a955f7ea] fixed -z-2"></div>    
      
      {/* nav bar */}

      <nav className="flex justify-between px-3 py-2 w-1/1 fixed top-0 backdrop-blur-md bg-[rgba(0,0,0,0.60)]">
        {/* logo */}
        <div className="">
          <img className="min-lg:w-21 md:w-19 sm:w-17 max-sm:w-15 h-auto mr-2" src="website-logo.png" />
        </div>
        {/* buttons */}
        <div className="flex gap-4 justify-center items-center max-sm:gap-2">
        <a href="http://localhost:4000/login">
          <Button className="text-black font-semibold rounded-full 
        bg-[#1ed760] hover:bg-[#1db954] cursor-pointer active:bg-[#1db954] flex 
        justify-center items-center h-min max-sm:text-xs max-sm:px-[8px]">
            Login with Spotify
          </Button>
        </a>
          <Menu className="text-white" />
        </div>
      </nav>

      {/* header line */}

      <div className="mx-auto w-fit text-white my-[80px] ">
        <h1 className="text-6xl md:text-4xl sm:text-4xl max-sm:text-[6vw] flex flex-col justify-center items-start">
          <span>Get to know your</span>
          <div className="flex gap-2 items-center">
            <img className="w-auto h-15 md:h-12 sm:h-12 max-sm:h-[8vw]" src="spotify-logo.png" />
            <span>stats — For Free</span>
          </div>
        </h1>
      </div>

      {/* grid box */}

      <div className="grid grid-cols-2 gap-6 gap-y-8 mx-auto w-3/4 max-w-[800px] my-[20px] max-sm:grid-cols-1">
      {/* text line 1 */}
        <div className="text-white min-lg:text-xl md:text-lg font-semibold text-justify flex flex-col justify-center max-sm:order-2">
          <span className="text-2xl min-lg:text-4xl font-semibold mb-[2px]">Your music taste is one of a kind.</span>
          Dive into your stats, explore your most played tracks, discover hidden gems,
          and see how your listening habits evolve — all in one place, beautifully visualized
        </div>
        {/* image 1 */}
        <div className="max-sm:order-1"><img className=" rounded-xl shadow-2xl shadow-slate-800" src="man_listening_songs.jpg"></img></div>
        {/* image 2 */}
        <div className="max-sm:order-3"><img className=" rounded-xl shadow-2xl shadow-slate-800" src="woman_listening_songs.jpg"></img></div>
        {/* text line 2 */}
        <div className="text-white min-lg:text-xl md:text-lg font-semibold text-justify flex flex-col justify-center max-sm:order-4">
          <span className="text-2xl min-lg:text-4xl font-semibold mb-[2px]">Connect your Spotify to begin.</span>
          We'll pull in your listening data securely and give you a fresh,
          fun look at your music story — no playlists touched, just insights delivered.
          {/* Login button */}
          <a href="http://localhost:4000/login">
            <Button className="text-black text-md p-[10px] font-semibold 
            rounded-full bg-[#1ed760] hover:bg-[#1db954] cursor-pointer active:bg-[#1db954] col-2 mx-auto
            flex justify-center items-center w-2/3 h-min min-w-fit mt-8">
              Discover yourself!
              <ArrowRight />
            </Button>
          </a>
        </div>
      </div>

      {/* footer */}

      <footer className="bg-gray-800 w-1/1 h-auto text-gray-400 p-3 mt-20">
        {/* logo */}
        <img className="w-20 opacity-60" src="website-logo.png" />
        {/* grid box */}
        <div className="grid grid-cols-[5fr_1fr] max-sm:grid-cols-1 p-2">
          {/* left half */}
          <div>
            <div className="text-sm">
              © 2025 Statify · Built with ❤️ for music lovers · Not affiliated with Spotify
            </div>
            <div className="col-1 text-sm m-5 ml-0">
              This app uses Spotify's public API to access user data.
              We do not store or share your personal information.
              Spotify is a registered trademark of Spotify AB.
            </div>
          </div>

          {/* right half */}
          <section className="flex justify-center max-sm:justify-start">
            <div className="flex flex-col items-start justify-start text-sm">
              <li className="list-none hover:underline cursor-pointer active:underline">
                ‧ About
              </li>
              <li className="list-none hover:underline cursor-pointer active:underline">
                <a href="https://github.com/Rohan-756/Statify" target="_blank"
                  rel="noopener noreferrer">
                  ‧ GitHub
                </a>
              </li>
            </div>
          </section>

        </div>


      </footer>


    </>
  );
}
