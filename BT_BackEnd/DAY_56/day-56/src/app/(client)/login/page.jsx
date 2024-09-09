"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";

function LoginPage() {
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .matches(emailRegEx, "Email khong hop le")
            .required("Vui lòng nhập địa chỉ email"),
        password: Yup.string()
            .min(6, "Mật khẩu quá ngắn")
            .required("Vui lòng nhập mật khẩu"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues: {
            email: "admin@gmail.com",
            password: "123456",
        },
    });

    const onSubmit = async ({ email, password }) => {
        setError("");
        setSuccess("");

        try {
            const res = await fetch(apiUrl + "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
                credentials: "include",
            });
            const data = await res.json();
            console.log(data);

            if (!res.ok) {
                throw new Error(data.error);
            }
            return router.push("/");
        } catch (e) {
            setError(e.message);
        }
    };
    useEffect(() => {
        if (searchParams.get("logoutSuccess") === "true") {
            setSuccess("Đăng xuất thành công");
        } else if (searchParams.get("registerSuccess") === "true") {
            setSuccess("Đăng ký thành công");
        }
    }, [searchParams]);
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
                <div className=" mt-2 h-10">
                    {error && (
                        <p className="text-red-500 text-center mt-5 bg-blue-100 p-2 rounded">
                            {error}
                        </p>
                    )}
                    {success && (
                        <p className="text-green-500 text-center mt-5 bg-blue-100 p-2 rounded">
                            {success}
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                            <p className="text-red-400 text-sm mt-2">
                                {errors.email?.message}
                            </p>
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
                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                {...register("password")}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 outline-none "
                            />
                            <p className="text-red-400  text-sm mt-2">
                                {errors.password?.message}
                            </p>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <Link
                        href="/register"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        &nbsp;Register now
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function Login() {
    return (
        <Suspense>
            <LoginPage />
        </Suspense>
    );
}
