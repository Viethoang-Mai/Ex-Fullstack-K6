"use client";

import { useTranslation } from "react-i18next";

export default function Projects() {
    const { t, i18n } = useTranslation();
    return (
        <div className="my-8">
            <h2 className="text-center text-2xl font-semibold">
                {t("common.project")}
            </h2>

            <ul className="mt-4">
                <li className="border-b border-gray-300 pb-2">
                    <h3 className="text-xl font-semibold">
                        Project Code snippet
                    </h3>
                    <p className="my-1 font-semibold">{t("common.pjDesc1")}:</p>
                    <div className="flex gap-5 text-orange-500 font-semibold">
                        <span className="cursor-pointer">Demo</span>{" "}
                        <span className="cursor-pointer">Code</span>
                    </div>
                </li>
                <li className="my-4 border-b border-gray-300 pb-2">
                    <h3 className="text-xl font-semibold">Project blog</h3>
                    <p className="my-1 font-semibold">{t("common.pjDesc2")}:</p>
                    <div className="flex gap-5 text-orange-500 font-semibold">
                        <span className="cursor-pointer">Demo</span>{" "}
                        <span className="cursor-pointer">Code</span>
                    </div>
                </li>
                <li className=" border-b border-gray-300 pb-2">
                    <h3 className="text-xl font-semibold">Project 20f8</h3>
                    <p className="my-1 font-semibold">{t("common.pjDesc3")}:</p>
                    <div className="flex gap-5 text-orange-500 font-semibold">
                        <span className="cursor-pointer">Demo</span>{" "}
                        <span className="cursor-pointer">Code</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}
