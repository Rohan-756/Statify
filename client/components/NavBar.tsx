import React from 'react'
import { Button } from './ui/button'
import Toggle from './Toggle'
import Link from 'next/link'
import ProfileButton from '@/app/profile/ProfileButton'

const NavBar = (props: any) => {
  return (
    <>
      {/* navbar */}

      <nav className="flex justify-between px-3 py-2 w-screen fixed top-0 backdrop-blur-lg bg-[rgb(255,255,255,0.35)] dark:bg-[rgba(0,0,0,0.60)] z-2">
        {/* logo */}
        <div className="cursor-pointer">
          <Link href="/">
            <img className="min-lg:w-21 w-19 h-auto mr-2" src="website-logo.png" />
          </Link>
        </div>
        {/* buttons */}
        <div className="flex gap-4 justify-center items-center mr-4">
          {/* login button */}
          {
            props.login==="true" ? (
              //login button
              <a href="http://localhost:4000/login">
                <Button className={` font-semibold rounded-full flex
        bg-[#1ed760] hover:bg-[#1db954] cursor-pointer active:bg-[#1db954] 
        justify-center items-center h-min max-sm:text-xs max-sm:px-[8px]`}>
                  Login with Spotify
                </Button>
              </a>
            ) : (
              //profile button
              <>
              {props.stats ? 
                <Link href="/stats">
                  <Button className="rounded-full hover:bg-[#1db954] bg-[#1ed760]
                   max-sm:text-xs max-sm:px-2 cursor-pointer TRANS_OFF">
                    Back to Stats
                  </Button>
                </Link>
                :
                <ProfileButton/>
              }
              
              </>
            )
          }
          {/* dark mode button */}
          <Toggle />
        </div>
      </nav>
    </>
  )
}

export default NavBar