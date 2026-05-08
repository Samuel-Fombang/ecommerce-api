import express from "express";
import { getProducts, createProduct } from "../controllers/products";
import { protect } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/adminMiddleware";

const router = express.Router();

/**
 * GET ALL PRODUCTS
 */
router.get("/", getProducts);

/**
 * CREATE PRODUCT (ADMIN ONLY)
 */
router.post("/", protect, isAdmin, createProduct);

export default router;