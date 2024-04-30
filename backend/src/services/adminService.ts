import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AdminRepository from "../repositories/adminRepository";
import { CustomError } from "../error/customError";
import userRepository from "../repositories/userRepository";
import vendorRepository from "../repositories/vendorRepository";
import bookingRepository from "../repositories/bookingRepository";

interface LoginResponse {
  refreshToken: string;
  token: string;
  adminData: object;
  message: string;
}

class AdminService {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const existingAdmin = await AdminRepository.findByEmail(email);
      if (!existingAdmin) {
        throw new CustomError("Admin not exist", 400);
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingAdmin.password
      );
      if (!passwordMatch) {
        throw new CustomError("Incorrect password...", 401);
      }

      let refreshToken = existingAdmin.refreshToken;

      if (!refreshToken) {
        refreshToken = jwt.sign(
          { _id: existingAdmin._id },
          process.env.JWT_REFRESH_SECRET!,
          { expiresIn: "7d" }
        );
      }

      existingAdmin.refreshToken = refreshToken;
      await existingAdmin.save();

      const token = jwt.sign(
        { _id: existingAdmin._id },
        process.env.JWT_SECRET!,
        { expiresIn: "24h" }
      );

      return {
        refreshToken,
        token,
        adminData: existingAdmin,
        message: "Successfully logged in..",
      };
    } catch (error) {
      throw new CustomError("An error occurred during login.", 500);
    }
  }

  async getDatas(adminId: string) {
    try {
      const result = await AdminRepository.getById(adminId);
      return result;
    } catch (error) {
      throw new CustomError("An unexpected error occurred while fetching admin data.", 500);
    }
  }

  async createRefreshTokenAdmin(refreshToken: string) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      ) as { _id: string };
      const Admin = await AdminRepository.getById(decoded._id);

      if (!Admin || Admin.refreshToken !== refreshToken) {
        throw new Error("Invalid refresh token");
      }

      const accessToken = jwt.sign(
        { _id: Admin._id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "24h",
        }
      );
      return accessToken;
    } catch (error) {
      throw new CustomError("An error occurred during createRefreshToken", 500);
    }
  }

  async findUsersCount() {
    try {
      return await userRepository.countDocuments();
    } catch (error) {
      console.error("Error fetching user count:", error);
      throw new CustomError("Unable to fetch user count", 500);
    }
  }

  async findVendorsCount() {
    try {
      return await vendorRepository.countDocuments();
    } catch (error) {
      console.error("Error fetching vendor count:", error);
      throw new CustomError("Unable to fetch vendor count", 500);
    }
  }

  async findBookingCount() {
    try {
      return await bookingRepository.countDocuments();
    } catch (error) {
      console.error("Error fetching booking count:", error);
      throw new CustomError("Unable to fetch booking count", 500);
    }
  }
}

export default new AdminService();
