// import React from 'react'

// const Footer = () => {
//   return (
//     <>
//     {/* footer */}

//     <footer className="bg-gray-800 w-1/1 h-auto text-gray-400 p-3 mt-20">
//         {/* logo */}
//         <img className="w-20 opacity-60" src="website-logo.png" />
//         {/* grid box */}
//         <div className="grid grid-cols-[5fr_1fr] max-sm:grid-cols-1 p-2">
//           {/* left half */}
//           <div>
//             <div className="text-sm">
//               © 2025 Statify · Built with ❤️ for music lovers · Not affiliated with Spotify
//             </div>
//             <div className="col-1 text-sm m-5 ml-0">
//               This app uses Spotify's public API to access user data.
//               We do not store or share your personal information.
//               Spotify is a registered trademark of Spotify AB.
//             </div>
//           </div>

//           {/* right half */}
//           <section className="flex justify-center max-sm:justify-start">
//             <div className="flex flex-col items-start justify-start text-sm">
//               <li className="list-none hover:underline cursor-pointer active:underline">
//                 ‧ About
//               </li>
//               {/* <li className="list-none hover:underline cursor-pointer active:underline">
//                 <a href="https://github.com/Rohan-756/Statify" target="_blank"
//                   rel="noopener noreferrer">
//                   ‧ GitHub
//                 </a>
//               </li> */}
//               <li className="list-none hover:underline cursor-pointer active:underline">
//                 ‧ Privacy Policy
//               </li>
//             </div>
//           </section>

//         </div>

//       </footer>
//     </>
//   )
// }

// export default Footer


// SEO


import React from 'react'

const Footer = () => {
  return (
    <>
      {/* footer */}
      <footer 
        className="bg-gray-800 w-1/1 h-auto text-gray-400 p-3 mt-20"
        role="contentinfo"
        aria-label="Website footer"
      >
        {/* logo */}
        <img 
          className="w-20 opacity-60" 
          src="website-logo.png" 
          alt="Statify website logo" 
          loading="lazy"
        />
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
          <section 
            className="flex justify-center max-sm:justify-start"
            aria-label="Footer navigation links"
          >
            <nav className="flex flex-col items-start justify-start text-sm">
              <li className="list-none hover:underline cursor-pointer active:underline">
                ‧ About
              </li>
              {/* <li className="list-none hover:underline cursor-pointer active:underline">
                <a href="https://github.com/Rohan-756/Statify" target="_blank"
                  rel="noopener noreferrer">
                  ‧ GitHub
                </a>
              </li> */}
              <li className="list-none hover:underline cursor-pointer active:underline">
                ‧ Privacy Policy
              </li>
            </nav>
          </section>

        </div>
      </footer>
    </>
  )
}

export default Footer
