import React from 'react'
import { Button } from './ui/button'
import Toggle from './Toggle'

const NavBar = () => {
  return (
    <>
    {/* navbar */}

    <nav className="flex justify-between px-3 py-2 w-screen fixed top-0 backdrop-blur-lg bg-[rgb(255,255,255,0.35)] dark:bg-[rgba(0,0,0,0.60)]">
        {/* logo */}
        <div className="">
          <img className="min-lg:w-21 md:w-19 sm:w-17 max-sm:w-15 h-auto mr-2" src="website-logo.png" />
        </div>
        {/* buttons */}
        <div className="flex gap-4 justify-center items-center max-sm:gap-2">
          {/* login button */}
          <a href="http://localhost:4000/login">
            <Button className=" font-semibold rounded-full 
        bg-[#1ed760] hover:bg-[#1db954] cursor-pointer active:bg-[#1db954] flex 
        justify-center items-center h-min max-sm:text-xs max-sm:px-[8px]">
              Login with Spotify
            </Button>
          </a>
          {/* dark mode button */}
          <Toggle />
        </div>
      </nav>
    </>
  )
}

export default NavBar