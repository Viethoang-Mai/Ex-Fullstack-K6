"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
export default function RegisterPage() {
    const [error, setError] = useState("");
    const [eye, setEye] = useState(false);
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const router = useRouter();

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .matches(emailRegEx, "Email khong hop le")
            .required("Vui lòng nhập địa chỉ email"),
        password: Yup.string()
            .min(6, "Mật khẩu quá ngắn")
            .required("Vui lòng nhập mật khẩu"),
        name: Yup.string()
            .min(4, "Tên phải 4 ký tự")
            .required("Vui lòng nhập họ tên"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginSchema),
    });

    const onSubmit = async ({ email, password, name }) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        name,
                    }),
                    credentials: "include",
                }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            return router.push("/login?registerSuccess=true");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up to your account
                </h2>
                <div className=" mt-2 h-10">
                    {error && (
                        <p className="text-red-500 text-center mt-5 bg-blue-100 p-2 rounded">
                            {error}
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                {...register("name")}
                                className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                            />
                            {errors.name && (
                                <p className="text-red-400 text-sm mt-2">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                {...register("email")}
                                className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                            />
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-2">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                        </div>
                        <div className="mt-2 relative  ">
                            <input
                                id="password"
                                name="password"
                                type={eye ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                {...register("password")}
                                className="block w-full rounded-md border-0  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 outline-none "
                            />

                            {errors.password && (
                                <p className="text-red-400 absolute text-sm mt-2">
                                    {errors.password.message}
                                </p>
                            )}
                            <span className=" cursor-pointer absolute inset-y-0 right-0 mr-3 flex items-center">
                                {eye ? (
                                    <i
                                        className="fa-regular fa-eye-slash "
                                        onClick={() => setEye(!eye)}
                                    ></i>
                                ) : (
                                    <i
                                        className="fa-regular fa-eye "
                                        onClick={() => setEye(!eye)}
                                    ></i>
                                )}
                            </span>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-10"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <p className="mt-2 text-right text-sm text-gray-500">
                    <Link
                        href="/login"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
