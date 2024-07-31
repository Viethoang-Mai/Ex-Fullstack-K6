"use client";
import { useSession } from "next-auth/react";

export default function UserPage() {
    const { data: session } = useSession();

    return (
        <section className=" container mx-auto">
            <h2 className="text-2xl font-bold  text-center">User Page</h2>

            <div className="">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img src={session?.user?.image} alt="" />
                </div>
                <h3 className="text-lg font-semibold">
                    {" "}
                    {session?.user?.name}
                </h3>
                <p className="text-sm">{session?.user?.email}</p>
            </div>
        </section>
    );
}
