import express from "express";
import { getProfileDetails } from "../controllers/profileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getProfileDetails);

export default router;
