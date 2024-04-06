import { Request, Response } from "express";
import { getDatas, login } from "../services/adminService";

export const AdminController = {
  async Adminlogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { token, adminData, message } = await login(email, password);
      res.cookie('jwtToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.status(200).json({token, adminData, message });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
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


  async getAdminData(req: Request, res: Response): Promise<void> {
    try {
      const adminId:string=req.query.adminId as string
      console.log(adminId)
      const adminData=await getDatas(adminId);
      res.status(200).json({adminData});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error..." });
    }
  },

  
};

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
