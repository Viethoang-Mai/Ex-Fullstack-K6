"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
    const pathname = usePathname();

    return (
        <div className="container text-center mx-auto mt-10  max-w-[1280px] ">
            <h1 className="text-3xl font-bold">Send Mail</h1>
            <div className="row w-full flex justify-between mt-5  ">
                <Link
                    className={
                        pathname === "/send-mail"
                            ? "w-1/2 bg-purple-300 py-2"
                            : "w-1/2 bg-purple-100 py-2"
                    }
                    href="/send-mail"
                >
                    Gửi email
                </Link>
                <Link
                    className={
                        pathname === "/email-history"
                            ? "w-1/2 bg-purple-300 py-2"
                            : "w-1/2 bg-purple-100 py-2"
                    }
                    href="/email-history"
                >
                    Lịch sử
                </Link>
            </div>
            {children}
        </div>
    );
}
