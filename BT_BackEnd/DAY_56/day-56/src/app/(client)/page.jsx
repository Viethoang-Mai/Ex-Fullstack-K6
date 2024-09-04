"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Homepage() {
    const router = useRouter();
    const handleClick = () => {
        localStorage.removeItem("login_token");
        return router.push("/login");
    };
    useEffect(() => {
        if (!localStorage.getItem("login_token")) {
            return router.push("/login");
        }
    });
    return (
        <div className="homepage text-center mt-10">
            <h1 className="text-3xl">F8 - Học lập trình để đi làm</h1>
            <p className="text-lg mt-5">Chào bạn </p>
            <button type="button" onClick={handleClick}>
                Đăng xuất
            </button>
        </div>
    );
}
