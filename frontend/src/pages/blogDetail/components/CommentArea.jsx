import React, { useState } from "react";
import { useSelector } from "react-redux";

import CommentForm from './CommentForm'
import Comment from "./Comment"

import {
    createNewCommentMutation,
    updateCommentMutation,
    deleteCommentMutation
} from "../../../services/commentService";

const CommentArea = ({ comments, postSlug }) => {
    const [affectedComment, setAffectedComment] = useState(null);

    const userState = useSelector((state) => state.user);

    const {
        mutate: mutateNewComment,
        isLoading: isLoadingNewComment
    } = createNewCommentMutation()
    const { mutate: mutateUpdateComment } = updateCommentMutation(postSlug)
    const { mutate: mutateDeleteComment } = deleteCommentMutation(postSlug)

    const addCommentHandler = (value, parent = null, replyOnUser = null) => {
        mutateNewComment({
            desc: value,
            parent,
            replyOnUser,
            token: userState.userInfo.token,
            slug: postSlug,
        });
        setAffectedComment(null);
    }

    const updateCommentHandler = (value, commentId) => {
        mutateUpdateComment({
            token: userState.userInfo.token,
            desc: value,
            commentId,
        });
        setAffectedComment(null);
    }

    const deleteCommentHandler = (commentId) => {
        mutateDeleteComment({ token: userState.userInfo.token, commentId });
    }

    return (
        <div className="mt-10">
            <CommentForm
                formSubmitHanlder={(value) => addCommentHandler(value)}
                loading={isLoadingNewComment}
            />

            <div className="space-y-4 mt-8">
                {comments.map((comment) => (
                    <div key={comment._id}>
                        <Comment
                            comment={comment}
                            affectedComment={affectedComment}
                            setAffectedComment={setAffectedComment}
                            addComment={addCommentHandler}
                            updateComment={updateCommentHandler}
                            deleteComment={deleteCommentHandler}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommentArea