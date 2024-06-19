import React from "react";
import { img } from "../Clients/data";
import PopularImage from "./PopularImage";

export default function Popular() {
    return (
        <section className="py-8 px-8 lg:py-20">
            <div className="container mx-auto grid items-center place-items-center">
                <div className="text-center">
                    <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-inherit mb-4 uppercase !text-gray-500">
                        POPULAR CLIENTS
                    </h6>
                    <h2 className="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 mb-4">
                        Trusted by over 10,000+ <br /> clients
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                        {img.map((item, index) => (
                            <PopularImage key={index} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
