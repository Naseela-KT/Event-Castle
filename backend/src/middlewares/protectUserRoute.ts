import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import User, { UserDocument } from "../models/user"; // Assuming User is your Mongoose model for users
import dotenv from "dotenv";
dotenv.config();

interface MyJwtPayload extends JwtPayload {
  userId: string; 
}

declare module "express-session" {
    interface Session {
      userInfo: UserDocument;
  
    }
  }


const protectUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwtUser;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as MyJwtPayload;

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    req.session.userInfo = user;
    next();
  } catch (error) {
    console.log("Error in User Protect Middleware:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectUser;
