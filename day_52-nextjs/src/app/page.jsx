"use client";
import React from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import Hobbies from "./components/Hobbies";
// import { appWithTranslation } from "next-i18next";
import "../i18n";
import Footer from "./components/Footer";
export default function HomePage() {
    return (
        <>
            <Header />

            <main className="mt-[64px] p-8 shadow ">
                <h1 className="text-3xl font-bold text-center mb-8">
                    F8 - Fullstack.edu.vn
                </h1>
                <div className="flex gap-x-4 ">
                    <Nav />
                    <div className="flex-grow ">
                        <Contact />
                        <Projects />
                        <Hobbies />
                    </div>
                </div>
                <Footer />
            </main>
        </>
    );
}
