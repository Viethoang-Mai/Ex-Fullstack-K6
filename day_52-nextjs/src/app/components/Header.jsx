"use client";
import React from "react";
// import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";

export default function Header() {
    const { i18n } = useTranslation();

    const [lang, setLang] = useState(i18n.language || "vi");

    const handleChange = (lang) => {
        setLang(lang);
        i18n.changeLanguage(lang);
    };
    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang, i18n]);

    useEffect(() => {
        localStorage.setItem("lang", lang);
    }, [lang, i18n]);

    return (
        <header className=" px-14 header flex items-center justify-between fixed top-0 left-0 right-0 bg-orange-400/90 h-16">
            <div className="logo text-2xl font-semibold  w-9 h-9 rounded-full flex items-center text-orange-400 justify-center border-2 border-white bg-white">
                H
            </div>
            <ThemeSwitcher />
            <div className="flex gap-1 ml-[1rem] font-semibold text-black">
                <a
                    onClick={() => handleChange("vi")}
                    className={` ${lang === "vi" && "active"} cursor-pointer`}
                >
                    VI
                </a>
                <span>|</span>
                <a
                    onClick={() => handleChange("en")}
                    className={` ${lang === "en" && "active"} cursor-pointer`}
                >
                    EN
                </a>
            </div>
        </header>
    );
}
