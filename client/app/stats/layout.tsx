import React, { ReactNode } from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="text-white">
        Hello world this is the stats page
        {children}
    </div>
  )
}

export default layout