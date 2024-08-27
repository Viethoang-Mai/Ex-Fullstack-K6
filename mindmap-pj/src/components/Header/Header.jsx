"use client";
import Link from "next/link";
import style from "./header.module.css";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
export default function Header() {
    const { user, error, isLoading } = useUser();
    const pathname = usePathname();
    const active = (path) => {
        return pathname === path
            ? style["nav-link-active"]
            : "hover:bg-[#d1d9e96a]";
    };
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <header className="header ">
            <div className="container px-4 h-20 mx-auto flex justify-between items-center">
                <h1 className="font-semibold text-primary text-2xl">
                    <Link href="/">Mindmap Flow</Link>
                </h1>
                <nav className="nav flex gap-5 items-center">
                    <Link
                        href="/"
                        className={clsx(style["nav-link"], active("/"))}
                    >
                        Trang chủ
                    </Link>
                    <Link
                        href="/about "
                        className={clsx(style["nav-link"], active("/about"))}
                    >
                        Giới thiệu
                    </Link>
                    <Link
                        href="/features"
                        className={clsx(style["nav-link"], active("/features"))}
                    >
                        Tính năng
                    </Link>
                    <Link
                        href="/price "
                        className={clsx(style["nav-link"], active("/price"))}
                    >
                        Bảng giá
                    </Link>
                    <Link
                        href="/contact"
                        className={clsx(style["nav-link"], active("/contact"))}
                    >
                        Liên hệ
                    </Link>
                    {user && (
                        <p className="text-primary">
                            Hi, {user.name || user.nickname}
                        </p>
                    )}

                    <Link
                        href={user ? "/my-Mindmap" : "/api/auth/login"}
                        className={clsx(
                            style["nav-action"],
                            "hover:bg-[#c3c1f579]"
                        )}
                    >
                        {user ? " Mind Map" : "Đăng nhập"}
                    </Link>

                    <Link
                        href={user ? "/api/auth/logout" : "/api/auth/login"}
                        className={clsx(
                            style["nav-action"],
                            style["sign-up"],
                            "hover:bg-[#c3c1f579]"
                        )}
                    >
                        {user ? "Đăng xuất" : "Đăng ký"}
                    </Link>
                </nav>
            </div>
        </header>
    );
}
