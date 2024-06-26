import express from "express";
import {
    createComment,
    updateComment,
    deleteComment,
    getAllComments
} from "../controllers/commentController.js"
import { authGuard, adminGuard } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authGuard, createComment)
router.get("/", authGuard, adminGuard, getAllComments)
router.put("/:commentId", authGuard, updateComment)
router.delete("/:commentId", authGuard, deleteComment)

export default router
