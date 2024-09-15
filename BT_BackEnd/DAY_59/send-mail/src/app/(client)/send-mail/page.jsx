"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { sendMail } from "@/utils/fetchrequest";

export default function SendMailPage() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    console.log(errors);

    const onSubmit = async ({ to, title, content }) => {
        setLoading(true);
        const res = await sendMail(to, title, content);
        if (res) {
            alert("Gửi email thành công");
        }
        setLoading(false);
        reset();
    };
    return (
        <div className="flex items-center min-h-screen bg-gray-50">
            <div className="container mx-auto">
                <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
                    <div className="text-center">
                        <h1 className="my-3 text-3xl font-semibold text-gray-700 ">
                            Contact Us
                        </h1>
                        <p className="text-gray-400 ">
                            Fill up the form below to send us a message.
                        </p>
                    </div>
                    <div className="m-7">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-6">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm text-gray-600 "
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="you@company.com"
                                    required
                                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 "
                                    {...register("to", {
                                        required: "Email is required.",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                />
                                {errors.to && (
                                    <p className="text-red-400 text-sm mt-2">
                                        {errors.to.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="title"
                                    className="block mb-2 text-sm text-gray-600 "
                                >
                                    Email Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="your title"
                                    required
                                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 "
                                    {...register("title", {
                                        required: "Title is required.",
                                    })}
                                />
                                {errors.title && (
                                    <p className="text-red-400 text-sm mt-2">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="message"
                                    className="block mb-2 text-sm text-gray-600 "
                                >
                                    Your Message
                                </label>
                                <textarea
                                    rows="5"
                                    name="message"
                                    id="message"
                                    placeholder="Your Message"
                                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 "
                                    required
                                    {...register("content", {
                                        required: "Content is required.",
                                    })}
                                ></textarea>
                                {errors.content && (
                                    <p className="text-red-400 text-sm mt-2">
                                        {errors.content.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-6">
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                                >
                                    {loading ? "Sending..." : "Send Email"}
                                </button>
                            </div>
                            <p
                                className="text-base text-center text-gray-400"
                                id="result"
                            ></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
