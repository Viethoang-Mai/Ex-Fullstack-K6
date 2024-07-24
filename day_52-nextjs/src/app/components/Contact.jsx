"use client";

import React from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
    const { t, i18n } = useTranslation();
    return (
        <div className="">
            <h2 className="heading text-2xl font-semibold text-center">
                {t("common.contact")}
            </h2>
            <ul className="mt-4">
                <li className="mb-2 text-lg font-medium">
                    Phone:{" "}
                    <a className="text-orange-400" href="tel:0977666666">
                        0977666666
                    </a>
                </li>
                <li className="text-lg font-medium mb-2">
                    Zalo:{" "}
                    <a
                        className="text-orange-400"
                        href="https://chat.zalo.me/"
                        target="_blank"
                    >
                        https://zalo.me
                    </a>
                </li>
                <li className="text-lg font-medium">
                    Email:{" "}
                    <a
                        className="text-orange-400"
                        href="viethoangmai21199@gmail.com"
                    >
                        viethoangmai21199@gmail.com
                    </a>
                </li>
            </ul>
        </div>
    );
}
