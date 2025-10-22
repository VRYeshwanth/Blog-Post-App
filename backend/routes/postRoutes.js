import express from "express";
import { getPosts, createPost } from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", verifyToken, createPost);

export default router;