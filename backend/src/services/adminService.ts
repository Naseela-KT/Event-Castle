import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findAdminByEmail } from "../repositories/adminRepository";

interface LoginResponse {
    token: string;
    adminData: object; 
    message: string;
  }

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const existingAdmin = await findAdminByEmail(email);
    if (!existingAdmin) {
      throw new Error("Admin not exist");
    }

    const passwordMatch = await bcrypt.compare(password, existingAdmin.password);
    if (!passwordMatch) {
      throw new Error("Incorrect password...");
    }
    const token = jwt.sign({ _id: existingAdmin._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return { token, adminData: existingAdmin, message: "Successfully logged in.." };
  } catch (error) {
    throw error;
  }
};
