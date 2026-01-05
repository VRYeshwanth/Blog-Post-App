import express from "express";
import {
    getProfileDetails,
    updateProfileDetails,
    deleteAccount,
} from "../controllers/profileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getProfileDetails);
router.patch("/", verifyToken, updateProfileDetails);
router.delete("/", verifyToken, deleteAccount);

export default router;
