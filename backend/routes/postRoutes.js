import express from "express";
import { getPosts, createPost, updatePost } from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", verifyToken, createPost);
router.patch("/:id", verifyToken, updatePost);

export default router;