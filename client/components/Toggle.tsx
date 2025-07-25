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
        <button onClick={
            () => {
                document.documentElement.classList.toggle("dark");
                setIsDark(!isDark)
            }
        }>
            {isDark ?
                <Moon className="text-white mr-4 max-sm:mr-2 w-6 h-auto cursor-pointer" />
                :
                <Sun className="text-white mr-4 max-sm:mr-2 w-6 h-auto cursor-pointer" />
            }
        </button>
    );
};

export default Toggle;
