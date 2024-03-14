import { NextFunction, Request, Response } from "express";
import User from "../models/user";

export const isBlocked = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: string | undefined = req.query.userId as string | undefined;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing or invalid." });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isActive) {
      // Clear JWT token if user is not active (blocked)
      res.clearCookie("jwtToken");
      return res.status(401).json({ message: "User is blocked" }); // Return 401 status to indicate blocked user
    }

    next(); // Move to the next middleware if user is active
  } catch (error) {
    console.error("Error in isBlocked middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default isBlocked;
