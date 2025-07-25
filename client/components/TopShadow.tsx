import React from 'react'

const TopShadow = (props:any) => {
  return (
    <>
    <div className={`w-screen h-0 shadow-[0_0_200px_150px]
     shadow-[rgb(174,0,255)] dark:shadow-[#a955f7ea] fixed -z-2
    ${props.className}`}></div>
    </>
  )
}

export default TopShadow