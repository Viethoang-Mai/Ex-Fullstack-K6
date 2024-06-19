import React from "react";
import { img } from "./data";

export default function ClientsSection() {
    return (
        <section className="px-8 py-28">
            <div className="container mx-auto text-center">
                <div className="container mx-auto mb-20 text-center">
                    <h5 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-8">
                        My awesome clients
                    </h5>
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        {img.map((item, index) => (
                            <img
                                key={index}
                                src={item.src}
                                alt={item.alt}
                                className="w-40"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
