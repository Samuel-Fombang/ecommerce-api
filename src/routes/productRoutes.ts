import express from "express";
import { getProducts, createProduct } from "../controllers/products";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);

export default router;