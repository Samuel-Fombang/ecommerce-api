import { Request, Response } from "express";
import { User } from "../models/User";
import { createUserSchema } from "../schemas/user.schema";

// GET all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password"); // hide password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// CREATE user (with validation)
export const createUser = async (req: Request, res: Response) => {
  try {
    // ✅ validate input using Zod
    const data = createUserSchema.parse(req.body);

    // check duplicate email (optional but good practice)
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create(data);

    // remove password from response
    const { password, ...safeUser } = user.toObject();

    res.status(201).json(safeUser);
  } catch (error: any) {
    res.status(400).json({
      message: "Validation error",
      error: error.message,
    });
  }
};