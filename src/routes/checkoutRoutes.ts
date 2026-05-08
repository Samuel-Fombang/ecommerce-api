import express from "express";
import { protect } from "../middleware/authMiddleware";
import { checkout } from "../controllers/checkout";

const router = express.Router();

// 💳 CHECKOUT
router.post("/", protect, checkout);

export default router;