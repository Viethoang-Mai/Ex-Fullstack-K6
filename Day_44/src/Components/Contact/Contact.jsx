import React from "react";
import FormContact from "./FormContact";
import InfoContact from "./InfoContact";
export default function Contact() {
    return (
        <section className="px-8 py-16">
            <div className="container mx-auto mb-20 text-center">
                <h1 className="block antialiased tracking-normal font-sans text-5xl font-semibold leading-tight text-blue-gray-900 mb-4">
                    Contact Us
                </h1>
                <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-inherit mx-auto w-full lg:w-5/12 !text-gray-500">
                    Ready to get started? Feel free to reach out through the
                    contact form, and let's embark on a journey of innovation
                    and success.
                </p>
            </div>
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md container mx-auto border border-gray/50">
                <div className="p-6 grid grid-cols-1 lg:grid-cols-7 md:gap-10">
                    <InfoContact />
                    <FormContact />
                </div>
            </div>
        </section>
    );
}
