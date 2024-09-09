import { NextResponse } from "next/server";
export function middleware(req) {
    const token = req.cookies.get("token"); // Kiểm tra JWT token trong cookie

    const { pathname } = req.nextUrl;

    // Nếu truy cập trang login nhưng đã đăng nhập, chuyển hướng về trang chủ
    if (
        (pathname === "/login" && token) ||
        (pathname === "/register" && token)
    ) {
        return NextResponse.redirect(new URL("/", req.url));
    }

   

    // Nếu không có token và cố gắng truy cập trang bảo mật, chuyển hướng về trang login
    if (!token && pathname !== "/login" && pathname !== "/register") {
        return NextResponse.redirect(new URL("/login", req.url));
    }


    return NextResponse.next();
}


export const config = {
    matcher: ["/", "/login", "/register"], 
};
