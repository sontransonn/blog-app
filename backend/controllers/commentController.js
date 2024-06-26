import POST from "../models/postModel.js"
import COMMENT from "../models/comment.js"

export const createComment = async () => {
    try {
        const { desc, slug, parent, replyOnUser } = req.body;

        const post = await POST.findOne({ slug: slug });

        if (!post) {
            const error = new Error("Post was not found");
            return next(error);
        }

        const newComment = new Comment({
            user: req.user._id,
            desc,
            post: post._id,
            parent,
            replyOnUser,
        });

        const savedComment = await newComment.save();

        return res.status(200).json(savedComment);
    } catch (error) {

    }
}

export const deleteComment = async () => {

}

export const updateComment = async () => {

}

export const getAllComments = async () => {

}