import { Request, Response } from "express";
import { Category } from "../models/Category";

// GET all categories
export const getCategories = async (req: Request, res: Response) => {
  const categories = await Category.find();
  res.json(categories);
};

// CREATE category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: "Error creating category" });
  }
};