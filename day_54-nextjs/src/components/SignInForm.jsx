"use client";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Loading from "./Loading/Loading";
export default function SignInForm() {
    const { data: session, status } = useSession();
    const route = useRouter();

    if (session) {
        return null;
    }
    if (status === "loading") {
        return <Loading />;
    }

    return (
        <>
            {!session && (
                <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 border-2 p-4 rounded border-sky-500 index-999 text-center">
                    <h1 className="text-2xl font-bold text-sky-500">Sign in</h1>
                    <div className=" flex gap-y-4 flex-col mt-5 gr-btn">
                        <button onClick={() => signIn("google")}>
                            <i className="fa-brands fa-google"></i> Sign in
                            width Google
                        </button>
                        <button onClick={() => signIn("github")}>
                            <i className="fa-brands fa-github"></i> Sign in
                            width Github
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
