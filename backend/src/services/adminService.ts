import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findAdminByEmail} from "../repositories/adminRepository";
import { CustomError } from "../controllers/adminController";

interface LoginResponse {
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
    const token = jwt.sign({ _id: existingAdmin._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return { token, adminData: existingAdmin, message: "Successfully logged in.." };
  } catch (error) {
    throw error;
  }
};



