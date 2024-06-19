import React from "react";
import { dataProject } from "./data";
import ProjectItem from "./ProjectItem";
export default function Project() {
    return (
        <section className="py-28 px-8">
            <div className="container mx-auto mb-20 text-center">
                <h2 className="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 mb-4">
                    My Projects
                </h2>
                <p className="block antialiased font-sans text-xl leading-relaxed text-inherit mx-auto w-full px-4 font-normal !text-gray-500 lg:w-6/12">
                    Whether you have a mobile app idea that needs to come to
                    life or a website that requires a facelift, I'm here to turn
                    your digital dreams into reality.
                </p>
            </div>
            <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-4">
                {dataProject.map((item, index) => (
                    <ProjectItem key={index} {...item} />
                ))}
            </div>
        </section>
    );
}
