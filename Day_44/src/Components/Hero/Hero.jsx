import React from "react";
import HeroForm from "./HeroForm";

export default function Hero() {
    return (
        <section className="bg-white p-8">
            <div className="container mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2">
                <div className="row-start-2 lg:row-auto">
                    <h1 className="block antialiased tracking-normal font-sans font-semibold text-blue-gray-900 mb-4 lg:text-5xl !leading-tight text-3xl">
                        Welcome to my Web <br />
                        Development Portofolio!
                    </h1>
                    <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-inherit mb-4 !text-gray-500 md:pr-16 xl:pr-28">
                        I'm Lily Smith, a passionate web developer based in USA.
                        Here, you'll get a glimpse of my journey in the world of
                        web development, where creativity meets functionality.
                    </p>
                    <HeroForm />
                </div>
                <img
                    loading="lazy"
                    width="1024"
                    height="1024"
                    className="h-[36rem] w-full rounded-xl object-cover"
                    src="https://demos.creative-tim.com/nextjs-tailwind-portfolio-page/image/image-7.svg"
                />
            </div>
        </section>
    );
}
