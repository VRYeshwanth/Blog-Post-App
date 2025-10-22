import express from "express";
import { getPosts, createPost, updatePost, deletePost } from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", verifyToken, createPost);
router.patch("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;