"use client";

import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useSession, signOut, signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
    const pathname = usePathname();
    const activeMenu = (path) => {
        return pathname === path ? "active-nav" : "";
    };
    const { data: session } = useSession();
    return (
        <header className="header flex px-10 items-center h-16 border-b border-gray-300">
            <div className="avt flex items-center gap-x-5 mr-10">
                <div className="avt-img rounded-full w-10 h-10 overflow-hidden">
                    <img
                        src="https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png"
                        alt="avatar"
                    />
                </div>
                <p className="name"> Duong Nguyen</p>
            </div>
            <nav className="flex gap-x-5 font-semibold text-lg">
                <Link href="/">
                    <i className="fa-solid fa-house"></i>
                </Link>
                <Link href="/blog" className={clsx(activeMenu("/blog"))}>
                    Blog
                </Link>
                <Link href="/contact" className={clsx(activeMenu("/contact"))}>
                    Contact
                </Link>
                <Link href="/chat" className={clsx(activeMenu("/chat"))}>
                    Chat
                </Link>
                <Link href="/profile" className={clsx(activeMenu("/profile"))}>
                    Profile
                </Link>
            </nav>
            <div className="action ml-auto flex gap-x-5">
                <ThemeSwitcher />
                {session && (
                    <Link
                        href="/user"
                        className="avt-img rounded-full w-9 h-9 overflow-hidden border-2 border-orange-500/80"
                    >
                        <img src={session?.user?.image} alt="" />
                    </Link>
                )}
                {session?.user?.image.toLowerCase().includes("google") && (
                    <button
                        className=" py-1 px-3 rounded-lg bg-blue-500/70 text-sm font-semibold "
                        onClick={() => signIn("github", { callbackUrl: "/" })}
                    >
                        Login with Github
                    </button>
                )}
                {session?.user?.image.toLowerCase().includes("github") && (
                    <button
                        className=" py-1 px-3 rounded-lg bg-blue-500/70 text-sm font-semibold "
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                    >
                        Login with Google
                    </button>
                )}
                {session && (
                    <button
                        className=" py-1 px-3 rounded-lg bg-red-500/70 text-sm font-semibold "
                        onClick={() => signOut({ callbackUrl: "/" })}
                    >
                        Sign out
                    </button>
                )}
            </div>
        </header>
    );
}
