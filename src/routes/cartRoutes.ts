import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart
} from "../controllers/cart";

const router = express.Router();

// 🛒 CART ROUTES
router.get("/", getCart);
router.post("/add", addToCart);
router.delete("/remove/:productId", removeFromCart);
router.delete("/clear", clearCart);

export default router;