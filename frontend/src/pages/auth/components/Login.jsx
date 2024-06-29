import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    Link,
    useNavigate
} from "react-router-dom";

import { MdMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";

import { loginUserMutation } from "../../../services/userService";

const Login = ({ toggleForm }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userState = useSelector((state) => state.user);

    const { mutate, isLoading } = loginUserMutation(dispatch)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (userState.userInfo) {
            navigate("/");
        }
    }, [navigate, userState.userInfo]);

    const submitHandler = (data) => {
        const { email, password } = data;
        mutate({ email, password });
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col mb-5 w-full">
                <div className="w-full relative">
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            pattern: {
                                value:
                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Enter a valid email",
                            },
                            required: {
                                value: true,
                                message: "Email is required",
                            },
                        })}
                        placeholder="Email"
                        className={`placeholder:text-[#959ead] text-dark-hard rounded-lg w-full px-8 py-4 font-semibold block outline-none border 
                                    ${errors.email ? "border-red-500" : "border-[#c3cad9]"}`}
                    />

                    <MdMailOutline
                        className="absolute left-2 top-1/2 transform -translate-y-1/2"
                        size={"20px"}
                    />
                </div>

                {errors.email?.message && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.email?.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col mb-5 w-full">
                <div className="w-full relative">
                    <input
                        type="password"
                        id="password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required",
                            },
                            minLength: {
                                value: 6,
                                message: "Password length must be at least 6 characters",
                            },
                        })}
                        placeholder="Password"
                        className={`placeholder:text-[#959ead] text-dark-hard w-full rounded-lg px-8 py-4 font-semibold block outline-none border ${errors.password ? "border-red-500" : "border-[#c3cad9]"
                            }`}
                    />

                    <MdLockOutline
                        className="absolute left-2 top-1/2 transform -translate-y-1/2"
                        size={"20px"}
                    />
                </div>

                {errors.password?.message && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.password?.message}
                    </p>
                )}
            </div>

            <Link
                to="/forget-password"
                className="text-sm font-semibold text-primary"
            >
                Quên mật khẩu?
            </Link>

            <button
                type="submit"
                disabled={!isValid || isLoading}
                className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                Đăng nhập
            </button>

            <p className="text-sm font-semibold text-[#5a7184] text-center">
                Bạn chưa có tài khoản?{" "}
                <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={toggleForm}
                >
                    Đăng ký ngay!
                </span>
            </p>
        </form>
    )
}

export default Login