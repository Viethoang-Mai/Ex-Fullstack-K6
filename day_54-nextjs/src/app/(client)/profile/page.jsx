"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PageProfile() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return router.push("/");
    }

    return (
        <>
            {session && (
                <section>
                    <h2 className="heading text-3xl font-bold text-center">
                        Profile
                    </h2>
                </section>
            )}
        </>
    );
}
