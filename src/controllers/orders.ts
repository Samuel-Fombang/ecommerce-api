import { Request, Response } from "express";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { User } from "../models/User";

export const getOrders = async (req: Request, res: Response) => {
  const orders = await Order.find()
    .populate("userId")
    .populate("products.productId");

  res.json(orders);
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, products } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    let total = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(400).json({
          message: `Invalid productId: ${item.productId}`,
        });
      }

      total += product.price * item.quantity;
    }

    const order = await Order.create({
      userId,
      products,
      total,
    });

    res.json(order);
  } catch (error) {
    console.log("ORDER ERROR:", error);

    res.status(400).json({
      message: "Error creating order",
      error: error instanceof Error ? error.message : error,
    });
  }
};