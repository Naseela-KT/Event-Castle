import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
<<<<<<< Updated upstream
import { findAdminByEmail} from "../repositories/adminRepository";
import { CustomError } from "../controllers/adminController";
=======
import { findAdminByEmail, findAdminById} from "../repositories/adminRepository";
import admin, { AdminDocument } from "../models/admin";
import { CustomError } from "../error/customError";
>>>>>>> Stashed changes

interface LoginResponse {
    refreshToken:string
    token: string;
    adminData: object; 
    message: string;
  }

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const existingAdmin = await findAdminByEmail(email);
    if (!existingAdmin) {
      throw new CustomError("Admin not exist",400);
    }

    const passwordMatch = await bcrypt.compare(password, existingAdmin.password);
    if (!passwordMatch) {
      throw new CustomError("Incorrect password...",401);
    }

    let refreshToken = existingAdmin.refreshToken;

    if (!refreshToken) {
      refreshToken = jwt.sign({ _id: existingAdmin._id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
    }

    existingAdmin.refreshToken = refreshToken;
    await existingAdmin.save();

    const token = jwt.sign({ _id: existingAdmin._id }, process.env.JWT_SECRET!, { expiresIn: '24h' });

    return {refreshToken, token, adminData: existingAdmin, message: "Successfully logged in.." };
  } catch (error) {
    throw error;
  }
};


export const createRefreshTokenAdmin = async (refreshToken:string)=>{
  try {

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { _id: string };
    const Admin = await admin.findById(decoded._id);

    if (!Admin || Admin.refreshToken !== refreshToken) {
        throw new Error('Invalid refresh token');
      }

    const accessToken = jwt.sign({ _id: Admin._id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    return accessToken;

  } catch (error) {
    
  }
}




