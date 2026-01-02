import express from "express";
import { getDashboardDetails } from "../controllers/dashboardController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", verifyToken, getDashboardDetails);

export default router;
