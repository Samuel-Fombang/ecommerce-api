import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

// 👮 ADMIN ONLY MIDDLEWARE
export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      message: "Access denied: Admin only",
    });
  }

  next();
};