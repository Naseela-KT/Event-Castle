import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository";
import { UserDocument } from "../models/userModel";
import generateOtp from "../utils/generateOtp";
import generateUserTokenAndSetCookie from "../utils/generateUserToken";
import { CustomError } from "../error/customError";
import { Response } from "express";
import adminRepository from "../repositories/adminRepository";
import notificationRepository from "../repositories/notificationRepository";
import { NOTIFICATION_TYPES } from "../models/notificationModel";

interface LoginResponse {
  userData: UserDocument;
  message: string;
  token: string;
  refreshToken: string;
}

class UserService {
  async signup(
    email: string,
    password: string,
    name: string,
    phone: number,
    res: Response
  ): Promise<object> {
    try {
      const existingUser = await userRepository.findByEmail(email);
      if (existingUser) {
        throw new CustomError("User already exists", 404);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const isActive: boolean = true;
      const newUser = await userRepository.create({
        email,
        password: hashedPassword,
        name,
        phone,
        isActive,
      });
      generateUserTokenAndSetCookie(newUser._id, res);
      const Admin = await adminRepository.findOne({});
      const adminNotification = await notificationRepository.create({
        recipient: Admin?._id,
        message: `New user registered!`,
        type: NOTIFICATION_TYPES.NEW_USER,
      });
      return { user: newUser };
    } catch (error) {
      throw error;
    }
  }

  async googleSignup(
    email: string,
    password: string,
    name: string
  ): Promise<object> {
    try {
      const existingUser = await userRepository.findByEmail(email);
      if (existingUser) {
        throw new CustomError("User already exists", 404);
      }
      const isActive: boolean = true;
      const newUser = await userRepository.create({
        email,
        password,
        name,
        isActive,
      });
      return { user: newUser };
    } catch (error) {
      throw error;
    }
  }

  async findUser(userId: string) {
    try {
      const user = await userRepository.getById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async gLogin(email: string, password: string): Promise<LoginResponse> {
    try {
      console.log("in service", email, password);
      const existingUser = await userRepository.findByEmail(email);
      if (!existingUser) {
        throw new CustomError("User not exists..", 404);
      }

      if (existingUser.isActive === false) {
        throw new CustomError("Blocked by Admin..", 404);
      }

      const token = jwt.sign(
        { _id: existingUser._id },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      let refreshToken = jwt.sign(
        { _id: existingUser._id },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: "7d" }
      );
      existingUser.refreshToken = refreshToken;

      await existingUser.save();
      return {
        refreshToken,
        token,
        userData: existingUser,
        message: "Successfully logged in..",
      };
    } catch (error) {
      throw error;
    }
  }

  async createRefreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      ) as { _id: string };

      const user = await userRepository.getById(decoded._id);
      console.log("user", user);

      if (!user || user.refreshToken !== refreshToken) {
        throw new Error("Invalid refresh token");
      }

      const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      return accessToken;
    } catch (error) {
      throw error;
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<LoginResponse>{
    try {
      const existingUser = await userRepository.findByEmail(email);
      if (!existingUser) {
        throw new CustomError("User not exists..", 404);
      }
  
      const passwordMatch = await bcrypt.compare(password, existingUser.password);
  
      if (!passwordMatch) {
        throw new CustomError("Incorrect password..", 401);
      }
  
      if (existingUser.isActive === false) {
        throw new CustomError("Blocked by Admin..", 404);
      }
  
      const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });
  
      let refreshToken = jwt.sign(
        { _id: existingUser._id },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: "7d" }
      );
      existingUser.refreshToken = refreshToken;
  
      await existingUser.save();
      return {
        refreshToken,
        token,
        userData: existingUser,
        message: "Successfully logged in..",
      };
    } catch (error) {
      throw error;
    }
  }

  async getUsers(page: number, limit: number, search: string){
    try {
      const users = await userRepository.findAllUsers(page, limit, search);
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUsersCount(){
    try {
      const total = await userRepository.countDocuments();
      return total;
    } catch (error) {
      throw error;
    }
  }


  async toggleUserBlock(userId: string): Promise<void>{
    try {
      const user = await userRepository.getById(userId);
      if (!user) {
        throw new Error("User not found");
      }
  
      user.isActive = !user.isActive; // Toggle the isActive field
      await user.save();
    } catch (error) {
      throw error;
    }
  }

  async generateOtpForPassword(email: string){
    try {
      const otpCode = await generateOtp(email);
      if (otpCode !== undefined) {
        return otpCode;
      } else {
        console.log("error on generating otp , please fix ..");
        throw new Error(`couldn't generate otp, error occcured ,please fix !!`);
      }
    } catch (error) {
      throw error;
    }
  }

  async ResetPassword(password: string, email: string){
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const status = await userRepository.UpdatePassword(hashedPassword, email);
      if (!status.success) {
        throw new Error(status.message);
      }
    } catch (error) {
      throw error;
    }
  }

  async CheckExistingUSer(email: string){
    try {
      const existingUser = await userRepository.findByEmail(email);
      return existingUser;
    } catch (error) {
      throw error;
    }
  }

  async checkCurrentPassword(
    currentpassword: string,
    userId: string
  ){
    try {
      const existingUser = await userRepository.getById(userId);
  
      if (!existingUser) {
        throw new CustomError("user not found", 404);
      }
  
      const passwordMatch = await bcrypt.compare(
        currentpassword,
        existingUser.password
      );
      if (!passwordMatch) {
        throw new CustomError("Password doesn't match", 401);
      }
  
      return passwordMatch;
    } catch (error) {
      throw error;
    }
  }

  async updateProfileService(
    name: string,
    phone: number,
    image: string,
    userId: string,
    imageUrl: string
  ){
    try {
      const existingUser = await userRepository.getById(userId);
      if (!existingUser) {
        throw new CustomError("User not found", 404);
      }
      const update = {
        name:"",
        phone:0,
        image:"",
        imageUrl:""


      };

      if (name) {
        update.name = name;
      } else if (existingUser?.name) {
        update.name = existingUser?.name;
      }
  
     
      if (phone) {
        update.phone = phone;
      } else if (existingUser?.phone) {
        update.phone = existingUser?.phone;
      }
  
   
      if (image) {
        update.image = image;
      } else if (existingUser?.image) {
        update.image = existingUser?.image;
      }
  

      if (imageUrl) {
        update.imageUrl = imageUrl;
      } else if (existingUser?.imageUrl) {
        update.imageUrl = existingUser.imageUrl;
      }
      const result=await userRepository.update(userId,update)
      const userData = await userRepository.getById(userId);
      return userData;
    } catch (error) {
      throw error;
    }
  }

  async UpdatePasswordService(
    newPassword: string,
    userId: string
  ){
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      const existingUser = await userRepository.getById(userId);
      if (!existingUser) {
        throw new CustomError("user not found", 404);
      }
      const email = existingUser.email;
  
      const updatedValue = await userRepository.UpdatePassword(hashedPassword, email);
      if (updatedValue) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async FavoriteVendor(vendorId: string, userId: string){
    try {
      const user = await userRepository.getById(userId);
      if (!user) {
        throw new Error("User not found.");
      }

      if (user.favourite.includes(vendorId)) {
        const index = user.favourite.indexOf(vendorId);
        user.favourite.splice(index, 1);
        await user.save();
        return false;
      }
      user.favourite.push(vendorId);
      await user.save();
  
      return true;
    } catch (error) {
      console.error("Error in addToFavorites service:", error);
      throw new Error("Failed to add vendor to favorites.");
    }
  }

  async FavoriteVendors(
    userid: string,
    page: number,
    pageSize: number
  ){
    try {
      const userData = await userRepository.getById(userid);
      if (!userData) {
        throw new Error("User not found");
      }
      const favs = userData.favourite;

      if (!favs || favs.length === 0) {
        throw new Error("No favorite vendors found for this user");
      }
      const { favoriteVendors: result, count: totalFavsCount } =
        await userRepository.getfavVendors(favs, page, pageSize);
      return { result, totalFavsCount };
    } catch (error) {
      throw error;
    }
  }

  async deleteFromFavorite(userId: string, vendorId: string){
    try {
      const data = await userRepository.deletefavVendor(userId, vendorId);
      return data;
    } catch (error) {
      throw error;
    }
  

}
}



export default new UserService();







