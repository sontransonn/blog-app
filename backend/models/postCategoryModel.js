import mongoose from "mongoose";

const postCategorySchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

const POSTCATEGORY = mongoose.model("postCategory", postCategorySchema);

export default POSTCATEGORY;