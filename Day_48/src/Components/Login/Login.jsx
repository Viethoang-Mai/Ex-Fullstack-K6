import LoginButton from "./LoginBtn";
import { useAuth0 } from "@auth0/auth0-react";
export default function Login() {
    const { isAuthenticated } = useAuth0();

    return (
        <>
            {!isAuthenticated && (
                <div className="mt-10 max-w-md mx-auto text-center  mx-auto  border-2 p-5 rounded">
                    <h1 className="text-xl font-bold my-2">
                        Cảm ơn bạn đã sử dụng dịch vụ của F8
                    </h1>
                    <p className="text-md my-2">
                        Nếu có bất kỳ câu hỏi hay trợ giúp nào, hãy đăng nhập và
                        đặt câu hỏi tại đây!
                    </p>
                    <LoginButton />
                </div>
            )}
        </>
    );
}
