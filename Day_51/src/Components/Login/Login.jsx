import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { loginMiddleware } from "../../redux/middlewares/LoginMiddleware";
export default function Login() {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    console.log(errors);
    const onSubmit = (data) => {
        dispatch(loginMiddleware(data.email));
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email" className="text-lg font-bold">
                    Enter your email:
                </label>
                <input
                    className=" my-2 w-full h-10 border border-gray-300 rounded-lg p-4"
                    type="text"
                    name="name"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Vui lòng nhập email",
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                            message: "Email không đúng định dạng",
                        },
                    })}
                />
                {errors.email && (
                    <p className="text-red-500 max-w-xs text-md">
                        {errors.email.message}
                    </p>
                )}
            </form>
        </div>
    );
}
