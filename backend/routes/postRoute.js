import express from "express";
import {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getAllPosts,
} from "../controllers/postController.js"
import { authGuard, adminGuard } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authGuard, adminGuard, createPost)
router.put("/:slug", authGuard, adminGuard, updatePost)
router.delete("/:slug", authGuard, adminGuard, deletePost)
router.get("/:slug", getPost)
router.get("/", getAllPosts)

export default router