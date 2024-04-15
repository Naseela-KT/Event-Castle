import { Request, Response } from "express";
import {
  signup,
  login,
  getUsers,
  toggleUserBlock,
  CheckExistingUSer,
  generateOtpForPassword,
  ResetPassword,
  getUsersCount,
  googleSignup,
  gLogin,
  checkCurrentPassword,
  UpdatePasswordService,
  updateProfileService,
  FavoriteVendor,
  FavoriteVendors,
  deleteFromFavorite,
} from "../services/userService";
import generateOtp from "../utils/generateOtp";
import user, { User } from "../models/user";
import Jwt from "jsonwebtoken";
import sharp from "sharp";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import crypto from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import generateUserTokenAndSetCookie from "../utils/generateUserToken";

interface DecodedData {
  name: string;
  email: string;
  picture: string;
  jti: string;
}

interface UserSession {
  otpSetTimestamp: number | undefined;
  email: string;
  password: string;
  name: string;
  phone: number;
  otpCode: string | undefined;
}

interface OTP {
  otp: string | undefined;
  email: string;
  otpSetTimestamp: number | undefined;
}

declare module "express-session" {
  interface Session {
    user: UserSession;
    otp: OTP | undefined;
  }
}

dotenv.config();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
  region: process.env.BUCKET_REGION!,
});

const randomImage = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

export const UserController = {
  async UserSignup(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name, phone } = req.body;

      const otpCode = await generateOtp(email);

      if (otpCode !== undefined) {
        req.session.user = {
          email: email,
          password: password,
          name: name,
          phone: parseInt(phone),
          otpCode: otpCode,
          otpSetTimestamp: Date.now(),
        };

        console.log("signup..Before");
        console.log(req.session);

        res.status(200).json({
          message: "OTP send to email for verification..",
          email: email,
        });
      } else {
        console.log("couldn't generate otp, error occcured ,please fix !!");
        res.status(500).json({
          message: `Server Error couldn't generate otp, error occcured ,please fix !!`,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      console.log("signup..After");
      console.log(req.session);
      const otp = req.body.otp;
      const userData = req.session.user;
      const email = userData.email;
      const password = userData.password;
      const name = userData.name;
      const phone = userData.phone;
      if (!userData.otpCode) {
        throw new CustomError("OTP Expired...Try to resend OTP !!", 400);
      }
      const otpCode = userData.otpCode;
      if (otp === otpCode) {
        const user= await signup(email, password, name, phone,res);
        
        res.status(201).json(user);
      } else {
        throw new CustomError("Invalid otp !!", 400);
      }
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    }
  },

  async UserLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const {  userData, message } = await login(email, password);

      
      await generateUserTokenAndSetCookie(userData._id,res)

      res.status(200).json({ userData, message});
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    }
  },

  async UserLogout(req: Request, res: Response): Promise<void> {
    try {
      res.cookie("jwtUser","",{maxAge:0});
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  async allUsers(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 6, search = "" } = req.query;
      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);

      const users = await getUsers(pageNumber, limitNumber, search.toString());
      const totalUsers = await getUsersCount();

      res.status(200).json({ users, totalUsers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error..." });
    }
  },

  async Toggleblock(req: Request, res: Response): Promise<void> {
    try {
      const userId: string | undefined = req.query.userId as string | undefined;
      if (!userId) {
        res.status(400).json({ message: "User ID is missing or invalid." });
        return;
      }
      await toggleUserBlock(userId);
      let process = await user.findOne({ _id: userId });
      res.status(200).json({
        message: "User block status toggled successfully.",
        process: !process?.isActive ? "block" : "unblock",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  async UserForgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const email = req.body.email;
      console.log(email);
      const user = await CheckExistingUSer(email);
      if (user) {
        const otp = await generateOtpForPassword(email);
        req.session.otp = {
          otp: otp,
          email: email,
          otpSetTimestamp: Date.now(),
        };
        console.log(req.session.otp);
        res.status(200).json({
          message: "OTP sent to email for password updation request ",
          email,
        });
      } else {
        res.status(400).json({ error: "User not found !!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  async VerifyOtpForPassword(req: Request, res: Response): Promise<void> {
    try {
      const ReceivedOtp = req.body.otp;
      const generatedOtp = req.session.otp?.otp;
      if (!req.session.otp) {
        throw new CustomError("OTP Expired...Try to resend OTP !!", 400);
      }

      if (ReceivedOtp === generatedOtp) {
        console.log("otp is correct , navigating user to update password.");
        res.status(200).json({ message: "Otp is verified..!" });
      } else {
        throw new CustomError("Invalid OTP !!", 400);
      }
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    }
  },

  async ResetUserPassword(req: Request, res: Response): Promise<void> {
    try {
      const password = req.body.password;
      const confirmPassword = req.body.confirm_password;
      if (password === confirmPassword) {
        const email = req.session.otp?.email;
        console.log("email " + email);
        const status = await ResetPassword(password, email!);
        req.session.otp = undefined;
        res.status(200).json({ message: "Password reset successfully." });
      } else {
        res.status(400).json({ error: "Passwords do not match." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  async ResendOtp(req: Request, res: Response): Promise<void> {
    try {
      const userData: UserSession | undefined = req.session.user;
      if (!userData) {
        res
          .status(400)
          .json({ error: "Session data not found. Please sign up again." });
        return;
      }
      const email = userData.email;
      const newOtp = await generateOtp(email);
      if (req.session.user) {
        req.session.user.otpCode = newOtp;
      } else {
        console.error("Session user data is unexpectedly undefined.");
        res.status(500).json({
          message: "Server Error: Session user data is unexpectedly undefined.",
        });
        return;
      }
      res.status(200).json({ message: "New OTP sent to email" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  async PwdResendOtp(req: Request, res: Response): Promise<void> {
    try {
      const otp: OTP | undefined = req.session.otp;
      if (!otp) {
        res
          .status(400)
          .json({ error: "Session data not found. Please sign up again." });
        return;
      }
      const email = otp.email;
      const newOtp = await generateOtp(email);
      if (req.session.otp) {
        req.session.otp.otp = newOtp;
      } else {
        console.error("Session user data is unexpectedly undefined.");
        res.status(500).json({
          message: "Server Error: Session user data is unexpectedly undefined.",
        });
        return;
      }
      res.status(200).json({ message: "New OTP sent to email" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  async googleRegister(req: Request, res: Response) {
    try {
      console.log("This is credential in body: ", req.body.credential);
      const token = req.body.credential;
      console.log(token);
      const decodedData = Jwt.decode(req.body.credential);

      console.log("Decoded data: ", decodedData);
      const { name, email, jti }: DecodedData = decodedData as DecodedData;
      const user = await googleSignup(email, jti, name);
      if (user) {
        res.status(200).json({ message: "user saved successfully" });
      }
    } catch (error) {
      res.status(400).json({ error: "User already exists" });
    }
  },

  async googleLogin(req: Request, res: Response) {
    try {
      const decodedData = Jwt.decode(req.body.credential) as DecodedData | null;
      console.log(decodedData);

      if (!decodedData) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const { email, jti } = decodedData;
      const password = jti;
      const { token, userData, message } = await gLogin(email, password);

      req.session.user = userData._id;
      res.cookie("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      res.status(200).json({ token, userData, message });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    }
  },

  async updatePasswordController(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);
      const currentPassword = req.body.current_password;
      const newPassword = req.body.new_password;
      const userId: string = req.query.userid as string;

      let status = await checkCurrentPassword(currentPassword, userId);

      if (!status) {
        throw new CustomError(`Current password is wrong!`, 400);
      }

      const data = await UpdatePasswordService(newPassword, userId);

      if (!data) {
        res
          .status(400)
          .json({ error: "couldn't update password..internal error." });
      }
      res.status(200).json({ message: "password updated successfully.." });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    }
  },

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const name = req.body.name;
      const phone = parseInt(req.body.phone);
      const userId: string = req.query.userid as string;
      console.log(userId);
      let imageName = "";
      let imageUrl="";
      
      if (req.file) {
        const buffer = await sharp(req.file?.buffer)
          .resize({ height: 1200, width: 1200, fit: "contain" })
          .toBuffer();

          imageName = randomImage();

        const params = {
          Bucket: process.env.BUCKET_NAME!,
          Key: imageName,
          Body: buffer,
          ContentType: req.file?.mimetype,
        };

        const command2 = new PutObjectCommand(params);
        await s3.send(command2);


        const getObjectParams={
          Bucket: process.env.BUCKET_NAME!,
          Key:imageName
        }
  
        const command = new GetObjectCommand(getObjectParams);
        imageUrl = await getSignedUrl(s3, command,{expiresIn: 86400 * 3});
        
      }

      const user = await updateProfileService(name, phone, imageName, userId,imageUrl);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    }
  },

  async AddFavVendor(req: Request, res: Response): Promise<void> {
    try {
      const vendorId: string = req.query.vendorId as string;
      const userId: string = req.query.userId as string;

      if (!vendorId) {
        res.status(400).json({ error: "Invalid vendor id." });
      }
      if (!userId) {
        res.status(400).json({ error: "Invalid user id." });
      }
      console.log("Userid: " + userId);
      console.log("vendorId: ", vendorId);
      
      const data = await FavoriteVendor(vendorId, userId);

      if (data) {
        res.status(200).json({ message: "vendor added to Favorite list.." });
      } else {
        res.status(400).json({ message: "vendor already present in favorites." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  async getFavoriteVendors(req: Request, res: Response): Promise<void>{
    try {
      const userId: string = req.query.userid as string;

      if (!userId) {
        res.status(400).json({ error: "Invalid user id." });
      }
      const result = await FavoriteVendors( userId);
      if (result) {
        res.status(200).json({ data:result});
      } else {
        res.status(400).json({ message: "No vendors in favorites." });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },


  async deleteFavoriteVendor(req: Request, res: Response): Promise<void>{
    try {
      const vendorId: string = req.query.vendorId as string;
      const userId:string = req.query.userId as string;

      if (!userId) {
        res.status(400).json({ error: "Invalid user id." });
      }
      const result = await deleteFromFavorite(userId,vendorId);
      if (result) {
        res.status(200).json({userData:result});
      } else {
        res.status(400).json({ message: "No vendors in favorites." });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  async getUsersForSidebar(req: Request, res: Response) {
    try {
      const filteredUsers = await user.find({}).select("-password");
  
      res.status(200).json(filteredUsers);
    } catch (error) {
      console.error("Error in getUsersForSidebar: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

};

// Define a custom error class
export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
