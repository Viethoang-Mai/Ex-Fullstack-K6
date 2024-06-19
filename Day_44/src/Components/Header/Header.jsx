import React from "react";
import HeaderNav from "./HeaderNav";
import HeaderBtn from "./HeaderBtn";
import ToggleBtn from "./ToggleBtn";
export default function Header() {
    return (
        <header className="block py-4 backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border-white/80 w-full max-w-full rounded-none px-4 bg-white  border-0 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <p className="block antialiased font-sans text-blue-gray-900 text-lg font-bold">
                    Material Tailwind
                </p>
                <HeaderNav />
                <HeaderBtn />
                <ToggleBtn />
            </div>
        </header>
    );
}
