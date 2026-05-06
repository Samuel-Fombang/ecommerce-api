import { Request, Response } from "express";
import { Product } from "../models/Product";
import { Category } from "../models/Category";

// GET all products
export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find().populate("categoryId");
  res.json(products);
};

// CREATE product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, categoryId } = req.body;

    // 🔍 DEBUG: see what is coming in
    console.log("BODY:", req.body);

    // check if category exists (FR016 rule)
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(400).json({
        message: "Invalid categoryId",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      categoryId,
    });

    res.json(product);
  } catch (error) {
    console.log("ERROR:", error); // 👈 VERY IMPORTANT

    res.status(400).json({
      message: "Error creating product",
      error: error instanceof Error ? error.message : error,
    });
  }
};