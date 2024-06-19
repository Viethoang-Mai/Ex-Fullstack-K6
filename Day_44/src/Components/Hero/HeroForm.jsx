import React from "react";

export default function HeroForm() {
    return (
        <div className="grid">
            <p className="block antialiased font-sans text-sm leading-normal mb-2 text-gray-900 font-medium">
                Your email
            </p>
            <form
                action=""
                className="mb-2 flex w-full flex-col gap-4 md:w-10/12 md:flex-row"
            >
                <div className="relative w-full min-w-[200px] h-11 lg:max-w-[403px]">
                    <input
                        type="text"
                        className="input-header w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-900 header-input"
                        placeholder=""
                    />
                    <label
                        htmlFor=""
                        className="flex w-full text-center h-full select-none pointer-events-none absolute  font-normal top-[0%] pl-5 items-center text-gray-500 transition-all duration-200  "
                    >
                        Enter your email
                    </label>
                </div>
                <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full px-4 md:w-[12rem]"
                    type="button"
                >
                    require offer
                </button>
            </form>
            <p className="block antialiased font-sans text-sm leading-normal text-inherit font-normal !text-gray-500">
                Read my{" "}
                <a
                    href="#!"
                    className="font-medium underline transition-colors"
                >
                    Terms and Conditions
                </a>
            </p>
        </div>
    );
}
