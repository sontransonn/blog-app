import mongoose from "mongoose"

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post", required: true
        },
        check: {
            type: Boolean,
            default: false
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
        },
        replyOnUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

commentSchema.virtual("replies", {
    ref: "Comment",
    localField: "_id",
    foreignField: "parent",
});

const COMMENT = mongoose.model("Comment", commentSchema)

export default COMMENT