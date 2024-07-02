import LoginButton from "./Components/LoginBtn";
export default function Login() {
    return (
        <div className="mt-10 max-w-md mx-auto text-center">
            <h1>Cảm ơn bạn đã sử dụng dịch vụ của F8</h1>
            <p>
                Nếu có bất kỳ câu hỏi hay trợ giúp nào, hãy đăng nhập và đặt câu
                hỏi tại đây!
            </p>
            <LoginButton />
        </div>
    );
}
