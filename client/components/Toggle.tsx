// "use client";

// import { useEffect, useState } from "react";
// import { Moon, Sun } from "lucide-react";

// const Toggle = () => {
//     const [isDark, setIsDark] = useState(false);

//     useEffect(() => {
//         if (typeof window !== "undefined") {
//             setIsDark(document.documentElement.classList.contains("dark"));
//         }
//     }, []);

//     return (
//         <button onClick={
//             () => {
//                 document.documentElement.classList.toggle("dark");
//                 setIsDark(!isDark)
//             }
//         }>
//             {isDark ?
//                 <Moon className="text-white w-6 h-auto cursor-pointer" />
//                 :
//                 <Sun className="text-white w-6 h-auto cursor-pointer" />
//             }
//         </button>
//     );
// };

// export default Toggle;



// SEO


"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const Toggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  return (
    <button
      onClick={() => {
        document.documentElement.classList.toggle("dark");
        setIsDark(!isDark);
      }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
      className="p-1 rounded-full"
    >
      {isDark ? (
        <Moon
          className="text-white w-6 h-auto cursor-pointer"
          aria-hidden="true"
        />
      ) : (
        <Sun
          className="text-white w-6 h-auto cursor-pointer"
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export default Toggle;
