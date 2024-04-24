import { Request, Response } from "express";
import  AdminService  from "../services/adminService";
import { CustomError } from "../error/customError";
import dotenv from "dotenv";
dotenv.config();

class AdminController {

  async Adminlogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { refreshToken, token, adminData, message } =
        await AdminService.login(email, password);
      res.cookie("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.status(200).json({ refreshToken, token, adminData, message });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    }
  }

  async Adminlogout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("jwtToken");
      res.status(200).json({ message: "admin logged out successfully.." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error..." });
    }
  }

  async getAdminData(req: Request, res: Response): Promise<void> {
    try {
      const adminId: string = req.query.adminId as string;
      console.log(adminId);
      const adminData = await AdminService.getDatas(adminId);
      res.status(200).json({ adminData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error..." });
    }
  }

  async createRefreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const token = await AdminService.createRefreshTokenAdmin(
        refreshToken
      );
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error refreshing token:", error);
      res.status(401).json({ message: "Failed to refresh token" });
    }
  }
}

export default new AdminController();
