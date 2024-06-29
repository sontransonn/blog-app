import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { setUserInfo } from "../redux/slices/userSlice";

import {
    loginUser,
    registerUser
} from "../apis/userApi";

export const registerUserMutation = (dispatch) => {
    return useMutation({
        mutationFn: ({ name, email, password }) => {
            return registerUser({ name, email, password })
        },
        onSuccess: (data) => {
            dispatch(setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    })
}

export const loginUserMutation = (dispatch) => {
    return useMutation({
        mutationFn: ({ email, password }) => {
            return loginUser({ email, password });
        },
        onSuccess: (data) => {
            dispatch(setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    })
}