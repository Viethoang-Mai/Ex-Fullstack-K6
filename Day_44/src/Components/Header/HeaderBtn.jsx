import React from "react";

export default function HeaderBtn() {
    return (
        <div className="hidden items-center gap-2 lg:flex">
            <button className="sign-in-btn align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20">
                SIGN IN
            </button>
            <a href="https://www.material-tailwind.com/blocks" target="_blank">
                <button className="blocks-btn align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                    BLOCK
                </button>
            </a>
        </div>
    );
}
