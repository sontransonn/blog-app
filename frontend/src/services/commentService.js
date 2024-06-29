import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createNewComment, updateComment, deleteComment } from "../apis/commentApi";

export const createNewCommentMutation = () => {
    return useMutation({
        mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
            return createNewComment({ token, desc, slug, parent, replyOnUser });
        },
        onSuccess: () => {
            toast.success(
                "Your comment is sent successfully, it will be visible after the confirmation of the Admin"
            );
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    })
}

export const updateCommentMutation = (postSlug) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ token, desc, commentId }) => {
            return updateComment({ token, desc, commentId });
        },
        onSuccess: () => {
            toast.success("Your comment is updated successfully");
            queryClient.invalidateQueries(["blog", postSlug]);
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });
}

export const deleteCommentMutation = (postSlug) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ token, commentId }) => {
            return deleteComment({ token, commentId });
        },
        onSuccess: () => {
            toast.success("Your comment is deleted successfully");
            queryClient.invalidateQueries(["blog", postSlug]);
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });
}