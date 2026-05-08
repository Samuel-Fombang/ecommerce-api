import { Request, Response } from "express";
import { Cart } from "../models/Cart";
import { Order } from "../models/Order";

export const checkout = async (req: Request, res: Response) => {
  const cart = await Cart.findOne({ userId: req.body.userId });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const order = await Order.create({
    userId: req.body.userId,
    items: cart.items,
    total: req.body.total
  });

  // CLEAR CART SAFELY
  cart.items.splice(0, cart.items.length);
  await cart.save();

  res.json({
    message: "Order created successfully",
    order
  });
};