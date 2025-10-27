import express from "express";
import {
    getPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost,
} from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.post("/", verifyToken, createPost);
router.patch("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;
