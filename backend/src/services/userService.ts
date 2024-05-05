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
      console.error("Error in signup:", error);
      throw new CustomError("Failed to sign up new user.", 500);
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
      console.error("Error in googleSignup:", error);
      throw new CustomError("Failed to sign up with Google.", 500);
    }
  }

  async findUser(userId: string) {
    try {
      const user = await userRepository.getById(userId);
      if (!user) {
        throw new CustomError("User not found.", 404);
      }
      return user;
    } catch (error) {
      console.error("Error in findUser:", error);
      throw new CustomError("Failed to find user.", 500);
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
      console.error("Error in gLogin:", error);
      throw new CustomError("Failed to log in.", 500);
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
        throw new CustomError("Invalid refresh token.", 401)
      }

      const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      return accessToken;
    } catch (error) {
      console.error("Error in createRefreshToken:", error)
      throw new CustomError("Failed to create refresh token.", 500); 
    }
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const existingUser = await userRepository.findByEmail(email);
      if (!existingUser) {
        throw new CustomError("User not exists..", 404);
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!passwordMatch) {
        throw new CustomError("Incorrect password..", 401);
      }

      if (existingUser.isActive === false) {
        throw new CustomError("Blocked by Admin..", 404);
      }

      const token = jwt.sign(
        { _id: existingUser._id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1h",
        }
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
      console.error("Error in login:", error)
      
    throw new CustomError("Failed to log in.", 500);
    }
  }

  async getUsers(page: number, limit: number, search: string) {
    try {
      const users = await userRepository.findAllUsers(page, limit, search);
      return users;
    } catch (error) {
      console.error("Error in getUsers:", error)
      throw new CustomError("Failed to get users.", 500);
    }
  }

  async getUsersCount() {
    try {
      const total = await userRepository.countDocuments();
      return total;
    } catch (error) {
      console.error("Error in getUsersCount:", error)
      throw new CustomError("Failed to get users count.", 500); 
    }
  }

  async toggleUserBlock(userId: string): Promise<void> {
    try {
      const user = await userRepository.getById(userId);
      if (!user) {
        throw new CustomError("User not found.", 404)
      }

      user.isActive = !user.isActive; // Toggle the isActive field
      await user.save();
    } catch (error) {
      console.error("Error in toggleUserBlock:", error)
      throw new CustomError("Failed to toggle user block.", 500);
    }
  }

  async generateOtpForPassword(email: string) {
    try {
      const otpCode = await generateOtp(email);
      if (!otpCode) {
        throw new CustomError("Failed to generate OTP.", 500)
      }
      return otpCode; 
    } catch (error) {
      console.error("Error in generateOtpForPassword:", error)
    throw new CustomError("Failed to generate OTP for password reset.", 500);
    }
  }

  async ResetPassword(password: string, email: string) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const status = await userRepository.UpdatePassword(hashedPassword, email);
      if (!status.success) {
        throw new Error(status.message);
      }
    } catch (error) {
      console.error("Error in ResetPassword:", error)
      throw new CustomError("Failed to reset password.", 500);
    }
  }

  async CheckExistingUSer(email: string) {
    try {
      const existingUser = await userRepository.findByEmail(email);
      return existingUser;
    } catch (error) {
      console.error("Error in CheckExistingUSer:", error)
      throw new CustomError("Failed to check existing user.", 500);
    }
  }

  async checkCurrentPassword(currentpassword: string, userId: string) {
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
      console.error("Error in checkCurrentPassword:", error)
      throw new CustomError("Failed to check current password.", 500); 
    }
  }

  async updateProfileService(
    name: string,
    phone: number,
    image: string,
    userId: string,
    imageUrl: string
  ) {
    try {
      const existingUser = await userRepository.getById(userId);
      if (!existingUser) {
        throw new CustomError("User not found", 404);
      }
      // const update = {
      //   name: "",
      //   phone: 0,
      //   image: "",
      //   imageUrl: "",
      // };

      // if (name) {
      //   update.name = name;
      // } else if (existingUser?.name) {
      //   update.name = existingUser?.name;
      // }

      // if (phone) {
      //   update.phone = phone;
      // } else if (existingUser?.phone) {
      //   update.phone = existingUser?.phone;
      // }

      // if (image) {
      //   update.image = image;
      // } else if (existingUser?.image) {
      //   update.image = existingUser?.image;
      // }

      // if (imageUrl) {
      //   update.imageUrl = imageUrl;
      // } else if (existingUser?.imageUrl) {
      //   update.imageUrl = existingUser.imageUrl;
      // }
      const update = {
        name: name || existingUser.name,
        phone: phone || existingUser.phone,
        image: image || existingUser.image,
        imageUrl: imageUrl || existingUser.imageUrl,
      };
      const result = await userRepository.update(userId, update);
      const userData = await userRepository.getById(userId);
      return userData;
    } catch (error) {
      console.error("Error in updateProfileService:", error)
      throw new CustomError("Failed to update profile.", 500);
    }
  }

  async UpdatePasswordService(newPassword: string, userId: string) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const existingUser = await userRepository.getById(userId);
      if (!existingUser) {
        throw new CustomError("user not found", 404);
      }
      const email = existingUser.email;

      const updatedValue = await userRepository.UpdatePassword(
        hashedPassword,
        email
      );
      if (updatedValue) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error in UpdatePasswordService:", error)
    throw new CustomError("Failed to update password.", 500);
    }
  }

  async FavoriteVendor(vendorId: string, userId: string) {
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

  async FavoriteVendors(userid: string, page: number, pageSize: number) {
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
      console.error("Error in FavoriteVendor:", error)
      throw new CustomError("Failed to update favorite vendors.", 500);
    }
  }

  async deleteFromFavorite(userId: string, vendorId: string) {
    try {
      const data = await userRepository.deletefavVendor(userId, vendorId);
      return data;
    } catch (error) {
      console.error("Error in FavoriteVendors:", error)
      throw new CustomError("Failed to retrieve favorite vendors.", 500); 
    }
  }
}

export default new UserService();
