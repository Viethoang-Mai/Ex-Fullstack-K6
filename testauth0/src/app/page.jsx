"use client";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
    const { user, error, isLoading } = useUser();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {!user && <a href="/api/auth/login">login</a>}
            {user && <h1>hihi</h1>}

            {user && <a href="/api/auth/logout">Logout</a>}
        </main>
    );
}
