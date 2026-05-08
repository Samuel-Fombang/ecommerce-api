import express from "express";
import {
  getCategories,
  createCategory,
} from "../controllers/categories";

import { protect } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/adminMiddleware";

const router = express.Router();

/**
 * GET CATEGORIES
 */
router.get("/", getCategories);

/**
 * CREATE CATEGORY (ADMIN ONLY)
 */
router.post("/", protect, isAdmin, createCategory);

export default router;