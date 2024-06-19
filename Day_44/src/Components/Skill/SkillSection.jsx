import React from "react";
import { dataSkill } from "./data";
export default function SkillSection() {
    return (
        <section className="px-8">
            <div className="container mx-auto mb-20 text-center">
                <p className="block antialiased font-sans text-base leading-relaxed text-blue-gray-900 mb-2 font-bold uppercase">
                    my skills
                </p>
                <h1 className="block antialiased tracking-normal font-sans text-5xl font-semibold leading-tight text-blue-gray-900 mb-4">
                    What I do
                </h1>
                <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-inherit mx-auto w-full !text-gray-500 lg:w-10/12">
                    I'm not just a developer; I'm a digital dreamweaver.
                    Crafting immersive online experiences is not just a job but
                    my calling. Discover below how I can help you.
                </p>
            </div>
            <div className="container mx-auto grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                {dataSkill.map((item) => (
                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none">
                        <div className="p-6 grid justify-center text-center">
                            <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-full bg-gray-900 p-2.5 text-white shadow">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="h-6 w-6"
                                    stroke-width="2"
                                >
                                    {item.path ? (
                                        <path
                                            fillRule="evenodd"
                                            d={item.path}
                                            clipRule="evenodd"
                                        ></path>
                                    ) : (
                                        <>
                                            <path
                                                fillRule="evenodd"
                                                d={item.paths[0]}
                                                clipRule="evenodd"
                                            ></path>
                                            <path d={item.paths[1]}></path>
                                        </>
                                    )}
                                </svg>
                            </div>
                            <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 mb-2">
                                {item.title}
                            </h5>
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit px-8 font-normal !text-gray-500">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
