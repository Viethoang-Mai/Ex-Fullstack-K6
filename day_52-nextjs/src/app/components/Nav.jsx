"use client";
import { useTranslation } from "react-i18next";

export default function Nav() {
    const { t, i18n } = useTranslation();
    return (
        <nav className="min-w-[32%] w-[32%]">
            <div className="user-img block w-[70%] text-center">
                <img
                    className=" rounded-full "
                    src="https://scontent.fhan3-1.fna.fbcdn.net/v/t39.30808-6/326385283_6393939467287668_1048236478201693485_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=g27P6qeDeV8Q7kNvgGztU8z&_nc_ht=scontent.fhan3-1.fna&oh=00_AYDbMK-WUYppMtMbF5FaEVztsQeTTHFk4G2HLQE_nk18jw&oe=66A6BBFD"
                    alt="f8"
                />
                <figcaption className="text-center text-md font-semibold ">
                    Front-end Developer
                </figcaption>
            </div>
            <div className="my-4">
                <h2 className="text-2xl font-semibold ">
                    {t("common.skills.title")}
                </h2>
                <p className="mt-4 font-bold text-xl">
                    {t("common.skills.inTitle1")}:{" "}
                    <span className="text-sm font-medium ">
                        REST API, React.js, Next.js, Redux, Context, CSS3,
                        HTML5, UI/UX, Figma, Photoshop...
                    </span>
                </p>
                <p className="mt-4 font-bold text-lg">
                    {t("common.skills.inTitle2")}:{" "}
                    <span className="text-sm font-medium ">
                        {t("common.skills.descT2")}
                    </span>
                </p>
            </div>
            <h2 className="text-2xl font-semibold">{t("common.educate")}</h2>
        </nav>
    );
}
