import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { setUserInfo } from '../../../redux/slices/userSlice';

import MainLayout from '../../../layouts/MainLayout'

import { registerUserMutation } from '../../../services/userService';

const Register = ({ toggleForm }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userState = useSelector((state) => state.user);

    const { mutate, isLoading } = registerUserMutation(dispatch)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const password = watch("password");

    useEffect(() => {
        if (userState.userInfo) {
            navigate("/");
        }
    }, [navigate, userState.userInfo]);

    const submitHandler = (data) => {
        const { name, email, password } = data;
        mutate({ name, email, password });
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col mb-5 w-full">
                <input
                    type="text"
                    id="name"
                    {...register("name", {
                        minLength: {
                            value: 1,
                            message: "Name length must be at least 1 character",
                        },
                        required: {
                            value: true,
                            message: "Name is required",
                        },
                    })}
                    placeholder="Name"
                    className={`placeholder:text-[#959ead] text-dark-hard rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.name ? "border-red-500" : "border-[#c3cad9]"
                        }`}
                />
                {errors.name?.message && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.name?.message}
                    </p>
                )}
            </div>
            <div className="flex flex-col mb-5 w-full">
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
                    className={`placeholder:text-[#959ead] text-dark-hard rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.email ? "border-red-500" : "border-[#c3cad9]"
                        }`}
                />
                {errors.email?.message && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.email?.message}
                    </p>
                )}
            </div>
            <div className="flex flex-col mb-5 w-full">
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
                    className={`placeholder:text-[#959ead] text-dark-hard rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.password ? "border-red-500" : "border-[#c3cad9]"
                        }`}
                />
                {errors.password?.message && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.password?.message}
                    </p>
                )}
            </div>
            <div className="flex flex-col mb-5 w-full">
                <input
                    type="password"
                    id="confirmPassword"
                    {...register("confirmPassword", {
                        required: {
                            value: true,
                            message: "Confirm password is required",
                        },
                        validate: (value) => {
                            if (value !== password) {
                                return "Passwords do not match";
                            }
                        },
                    })}
                    placeholder="Confirm password"
                    className={`placeholder:text-[#959ead] text-dark-hard rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.confirmPassword ? "border-red-500" : "border-[#c3cad9]"
                        }`}
                />
                {errors.confirmPassword?.message && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.confirmPassword?.message}
                    </p>
                )}
            </div>
            <button
                type="submit"
                disabled={!isValid || isLoading}
                className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                Đăng ký
            </button>
            <p className="text-sm font-semibold text-[#5a7184] text-center">
                Bạn đã có tài khoản?{" "}
                <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={toggleForm}
                >
                    Đăng nhập ngay!
                </span>
            </p>
        </form>
    )
}

export default Register