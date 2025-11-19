import {
    getComments,
    createComment,
    editComment,
    deleteComment,
} from "../controllers/commentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/:postId", getComments);
router.post("/", verifyToken, createComment);
router.patch("/:id", verifyToken, editComment);
router.delete("/:id", verifyToken, deleteComment);

export default router;
