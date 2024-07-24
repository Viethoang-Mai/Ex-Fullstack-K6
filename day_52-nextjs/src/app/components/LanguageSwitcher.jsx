"use client";
import { useRouter } from "next/navigation";

function LanguageSwitcher() {
    const router = useRouter();
    const changeLanguage = (lang) => {
        router.push(router.pathname, router.asPath, { locale: lang });
    };

    return (
        <div>
            <button onClick={() => changeLanguage("en")}>En</button>
            <button onClick={() => changeLanguage("vi")}>Vn</button>
        </div>
    );
}

export default LanguageSwitcher;
