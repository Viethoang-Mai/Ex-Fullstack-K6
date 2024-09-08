"use client";
import { useRouter } from "next/navigation";

export default function Homepage() {
    const router = useRouter();

    const handleClick = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/logout`,
                {
                    method: "POST",

                    credentials: "include",
                }
            );
            if (!response.ok) throw new Error("Logout failed");

            return router.push("/login?logoutSuccess=true");
        } catch (error) {
            console.log(error);
        }
    };

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
