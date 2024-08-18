import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
    const path = req.nextUrl.pathname;
    const idMap = path.replace("/my-Mindmap", "").replace("/", "");

    // Fetch toàn bộ dữ liệu từ JSON Server
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_MINDMAP}`);

    const data = await response.json();

    // Tìm Mind Map dựa trên idMap trong toàn bộ users
    let mindMap;
    let ownerId;
    let status = "";
    data.forEach((user) => {
        const foundMap = user.mindMapData.find((map) => map.idMap === idMap);
        if (foundMap) {
            mindMap = foundMap;
            ownerId = user.id;
            status = mindMap.checkStatus;
        }
    });

    if (status === "private") {
        const session = await getSession(req);
        const user = session?.user;

        // Kiểm tra nếu người dùng không đăng nhập hoặc không phải là chủ sở hữu
        if (!user) {
            return NextResponse.redirect(new URL("/api/auth/login", req.url));
        }
        if (user.sub !== ownerId) {
            return NextResponse.redirect(new URL("/notFound", req.url));
        }
    } else if (path.includes("/my-Mindmap")) {
        const session = await getSession(req);
        const user = session?.user;

        if (!user) {
            return NextResponse.redirect(new URL("/api/auth/login", req.url));
        }
    }

    return NextResponse.next();
};

export const config = {
    matcher: ["/my-Mindmap/:path*"],
};
