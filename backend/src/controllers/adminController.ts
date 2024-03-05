import { Request, Response } from "express";
import { login } from "../services/adminService";

export const AdminController = {
  async Adminlogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { token, adminData, message } = await login(email, password);
      res.cookie('jwtToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      
      res.status(200).json({token, adminData, message });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error.." });
    }
  },

  async Adminlogout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie('jwtToken');
      res.status(200).json({ message: "admin logged out successfully.." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error..." });
    }
  },

  
};
