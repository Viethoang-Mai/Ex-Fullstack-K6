import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import LogoutButton from "./LogoutBtn";
import emailjs from "@emailjs/browser";
import { AppContext } from "../../App";
import { toast } from "react-toastify";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { setLoading } = useContext(AppContext);
    if (isLoading)
        return (
            <div className="over-loading fixed inset-0 justify-center items-center">
                <div className="loader"></div>
            </div>
        );

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        emailjs
            .send(
                "service_frl4cw8",
                "template_jvqb3io",
                {
                    from_name: user.nickname,
                    from_email: e.target.from_email.value,
                    message: e.target.message.value,
                },
                "FZ7g_teN0f0EydjB-"
            )
            .then(
                (result) => {
                    toast.success("Đã gửi email thành công");
                },
                (error) => {
                    toast.error("Gửi email thất bại, vui lòng kiểm tra lại!!!");
                }
            )
            .finally(() => {
                setLoading(false);
            });

        e.target.reset();
    };

    return (
        isAuthenticated && (
            <div className="max-w-md mx-auto mt-10 border-2 p-5 rounded">
                <div className="border-2 p-5 w-full ">
                    <div className="text-center">
                        <img
                            src={user.picture}
                            alt={user.name}
                            className="rounded-full w-32 h-32 mx-auto"
                        />
                        <h2 className="text-lg font-semibold my-2">
                            Xin chào {user.nickname}
                        </h2>
                        {user.email && (
                            <p className="text-sm">Email: {user.email}</p>
                        )}
                    </div>
                    <form action="" onSubmit={handleSubmit} className="mt-6">
                        <div className="flex flex-col relative w-full h-14 mb-6">
                            <label
                                htmlFor="email"
                                className="absolute px-2 bg-white top-0 text-xs text-gray-400 left-3 transform -translate-y-1/2"
                            >
                                Email của bạn*:
                            </label>
                            <input
                                type="email"
                                name="from_email"
                                id="email"
                                autoFocus={true}
                                defaultValue={user?.email}
                                className="w-full h-full border-2 border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:shadow-outline focus:border-blue-500 text-sm"
                            />
                        </div>
                        <div className="flex flex-col relative w-full h-24">
                            <label
                                htmlFor="message"
                                className="absolute px-2 bg-white top-0 text-xs text-gray-400 left-3 transform -translate-y-1/2"
                            >
                                Tin nhắn*:
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                defaultValue="Tôi cần giúp đỡ bài tập về nhà"
                                className="w-full h-full border-2 border-gray-400 rounded-md p-3 focus:outline-none focus:shadow-outline focus:border-blue-500 text-sm"
                            ></textarea>
                        </div>
                        <button className="w-full text-center mt-5 text-indigo-600 hover:text-indigo-500 border-2 border-indigo-600  rounded-md px-4 py-2 hover:bg-indigo-100">
                            Gửi yêu cầu hỗ trợ
                        </button>
                    </form>
                </div>
                <LogoutButton />
            </div>
        )
    );
};

export default Profile;
