import {
    getComments,
    createComment,
} from "../controllers/commentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/:postId", getComments);
router.post("/", verifyToken, createComment);

export default router;
