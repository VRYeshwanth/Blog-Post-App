import express from "express";
import {
    getProfileDetails,
    updateProfileDetails,
} from "../controllers/profileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getProfileDetails);
router.patch("/", verifyToken, updateProfileDetails);

export default router;
