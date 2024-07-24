"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Night } from "../icon/Night";
import { Day } from "../icon/Day";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme("light");

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {theme === "light" && (
                <button onClick={() => setTheme("dark")}>
                    <Night className="w-[1.75rem] h-[1.75rem]" />
                </button>
            )}
            {theme === "dark" && (
                <button onClick={() => setTheme("light")}>
                    <Day className="w-[1.75rem] h-[1.75rem]" />
                </button>
            )}
        </>
    );
}
