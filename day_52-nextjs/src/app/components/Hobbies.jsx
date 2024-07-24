import { useTranslation } from "react-i18next";

export default function Hobbies() {
    const { t, i18n } = useTranslation();
    const arr = t("common.hobby.content");
    console.log(arr);
    return (
        <div>
            <h2 className="text-2xl font-semibold text-center mb-4">
                {t("common.hobby.title")}
            </h2>
            <ul className=" font-medium ">
                <li>- {t("common.hobby.content1")}</li>
                <li>- {t("common.hobby.content2")}</li>
                <li>- {t("common.hobby.content3")}</li>
            </ul>
        </div>
    );
}
