export const metadata = {
    title: "Mind Map của tôi | Mind-map Flow ",
    description: "Học tập hiệu quả với bản đồ tư duy",
};
import Link from "next/link";
import ListMindMap from "./ListMindMap";
import { getSession } from "@auth0/nextjs-auth0";
export default async function MindMapPage() {
    const session = await getSession();
    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-semibold mb-5 text-sky-500 [word-spacing:3px]">
                    Mind Map của tôi
                </h2>
                <Link
                    className="btn py-2 px-4 bg-blue-500 text-white rounded-full "
                    href="/my-Mindmap/create"
                >
                    Tạo mới
                </Link>
                <div>
                    <h4 className="text-xl font-semibold mb-5 [word-spacing:3px] mt-5">
                        Danh sách
                    </h4>
                    <ListMindMap userId={session.user.sub} />
                </div>
            </div>
        </section>
    );
}
