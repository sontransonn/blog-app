import POST from "../models/postModel.js"
import COMMENT from "../models/commentModel.js"

export const createComment = async (req, res, next) => {
    try {
        const { desc, slug, parent, replyOnUser } = req.body;

        const post = await POST.findOne({ slug: slug });

        if (!post) {
            const error = new Error("Post was not found");
            return next(error);
        }

        const newComment = new COMMENT({
            user: req.user._id,
            desc,
            post: post._id,
            parent,
            replyOnUser,
        });

        const savedComment = await newComment.save();

        return res.status(200).json(savedComment);
    } catch (error) {
        next(error);
    }
}

export const updateComment = async (req, res, next) => {
    try {
        const { desc, check } = req.body;

        const comment = await COMMENT.findById(req.params.commentId);

        if (!comment) {
            const error = new Error("Comment was not found");
            return next(error);
        }

        comment.desc = desc || comment.desc;
        comment.check = typeof check !== "undefined" ? check : comment.check;

        const updatedComment = await comment.save();

        return res.json(updatedComment);
    } catch (error) {
        next(error);
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await COMMENT.findByIdAndDelete(req.params.commentId);

        await COMMENT.deleteMany({ parent: comment._id });

        if (!comment) {
            const error = new Error("Comment was not found");
            return next(error);
        }

        return res.json({
            message: "Comment is deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}

export const getAllComments = async () => {

}