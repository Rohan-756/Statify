import NavBar from '@/components/NavBar'
import "./profile.css"
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = () => {
  return (
    <>
      <div className="top-shadow -z-10"></div>
      <NavBar stats="true" />
      <div className="p-2">
        <div className="max-w-2xl mx-auto mt-25 p-4 grid grid-cols-2 backdrop-blur-xl bg-[rgb(255,255,255,0.4)] rounded-2xl">
          <div className="w-50 h-50">
            <img className="rounded-full aspect-square " src="man_listening_songs.jpg"></img>
          </div>
          <div className="flex flex-col justify-center">
            <span>Username</span>
            <span>name</span>
            <span>email</span>
            <Link href="/">
              <Button className="rounded-full hover:bg-[#1db954] bg-[#1ed760]
                   max-sm:text-xs max-sm:px-2 cursor-pointer TRANS_OFF">
                Go to Spotify
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </>
  )
}

export default page