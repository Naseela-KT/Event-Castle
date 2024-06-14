import { Request, Response } from "express";
import moment from "moment";
import VendorService from "../services/vendorService";
import generateOtp from "../utils/generateOtp";
import vendor from "../models/vendorModel";

import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { CustomError } from "../error/customError";
import { Types } from "mongoose";
import payment from "../models/paymentModel";
import { handleError } from "../utils/handleError";

dotenv.config();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
  region: process.env.BUCKET_REGION!,
});

interface VendorSession {
  email: string;
  password: string;
  name: string;
  phone: number;
  city: string;
  vendor_type: string;
  otpCode?: string | undefined;
  otpSetTimestamp?: number | undefined;
}

interface OTP {
  otp: string | undefined;
  email: string;
  otpSetTimestamp: number | undefined;
}

declare module "express-session" {
  interface Session {
    vendorData: VendorSession;
    otp: OTP | undefined;
  }
}

function getCurrentWeekRange() {
  const startOfWeek = moment().startOf("isoWeek").toDate();
  const endOfWeek = moment().endOf("isoWeek").toDate();
  return { startOfWeek, endOfWeek };
}

// Function to get current year range
function getCurrentYearRange() {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1);
  const endOfYear = new Date(new Date().getFullYear() + 1, 0, 1);
  return { startOfYear, endOfYear };
}

// Function to calculate the last five years' range
function getLastFiveYearsRange() {
  const currentYear = new Date().getFullYear();
  const startOfFiveYearsAgo = new Date(currentYear - 5, 0, 1);
  const endOfCurrentYear = new Date(currentYear + 1, 0, 1);
  return { startOfFiveYearsAgo, endOfCurrentYear };
}

class VendorController {
  async vendorSignup(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name, phone, city, vendor_type } = req.body;

      const otpCode = await generateOtp(email);

      if (otpCode !== undefined) {
        req.session.vendorData = {
          email: email,
          password: password,
          name: name,
          phone: parseInt(phone),
          city: city,
          otpCode: otpCode,
          vendor_type: vendor_type,
          otpSetTimestamp: Date.now(),
        };

        console.log("vendor signup..Before");
        console.log(req.session);
        res.status(200).json({
          message: "OTP send to vendor's email for verification..",
          email: email,
        });
      } else {
        console.log("couldn't generate otp, error occcured ,please fix !!");
        res.status(500).json({
          message: `Server Error couldn't generate otp, error occcured ,please fix !!`,
        });
      }
    } catch (error) {
      handleError(res, error, "vendorSignup");
    }
  }

  async createRefreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      const token = await VendorService.createRefreshToken(refreshToken);

      res.status(200).json({ token });
    } catch (error) {
      handleError(res, error, "createRefreshToken");
    }
  }

  async ResendOtp(req: Request, res: Response): Promise<void> {
    try {
      const vendorData: VendorSession | undefined = req.session.vendorData;
      if (!vendorData) {
        res
          .status(400)
          .json({ error: "Session data not found. Please sign up again." });
        return;
      }
      const email = vendorData.email;
      const newOtp = await generateOtp(email);
      if (req.session.vendorData) {
        req.session.vendorData.otpCode = newOtp;
      } else {
        console.error("Session user data is unexpectedly undefined.");
        res.status(500).json({
          message: "Server Error: Session user data is unexpectedly undefined.",
        });
        return;
      }
      res.status(200).json({ message: "New OTP sent to email" });
    } catch (error) {
      handleError(res, error, "ResendOtp");
    }
  }

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
      handleError(res, error, "PwdResendOtp");
    }
  }

  async VendorLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { refreshToken, token, vendorData, message } =
        await VendorService.login(email, password);
      res.cookie("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.status(200).json({ token, vendorData, message });
    } catch (error) {
      handleError(res, error, "VendorLogin");
    }
  }

  async VendorLogout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("jwtToken");
      res.status(200).json({ message: "vendor logged out successfully" });
    } catch (error) {
      handleError(res, error, "VendorLogout");
    }
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const otp = req.body.otp;
      const vendorData = (req.session as any).vendorData;
      const email = vendorData.email;
      const password = vendorData.password;
      const name = vendorData.name;
      const phone = vendorData.phone;
      const city = vendorData.city;
      const vendor_type = vendorData.vendor_type;
      const otpCode = vendorData.otpCode;

      if (!vendorData.otpCode) {
        throw new CustomError("OTP Expired...Try to resend OTP !!", 400);
      }
      if (otp === otpCode) {
        const {token,vendor} = await VendorService.signup(
          email,
          password,
          name,
          phone,
          city,
          vendor_type
        );

        res.status(201).json({vendor});
      } else {
        throw new CustomError("Invalid otp !!", 400);
      }
    } catch (error) {
      throw error;
    }
  }

  async VendorForgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const email = req.body.email;
      const vendor = await VendorService.CheckExistingVendor(email);
      if (vendor) {
        const otp = await generateOtp(email);
        (req.session as any).vendorotp = { otp: otp, email: email };
        console.log(req.session);
        res.status(200).json({
          message: "otp sent to vendor email for password updation request ",
          email: email,
        });
      } else {
        res.status(400).json({ error: "Email not Registered with us !!" });
      }
    } catch (error) {
      handleError(res, error, "VendorForgotPassword");
    }
  }

  async VerifyOtpForPassword(req: Request, res: Response): Promise<void> {
    try {
      const ReceivedOtp = req.body.otp;
      console.log("received otp", ReceivedOtp);
      console.log(req.session);
      const generatedOtp = (req.session as any).vendorotp.otp;
      console.log("generated otp", generateOtp);

      if (ReceivedOtp === generatedOtp) {
        console.log("otp is correct , navigating vendor to update password.");
        res
          .status(200)
          .json({ message: "otp is correct, please update password now" });
      } else {
        res.status(400).json({ Error: `otp's didn't matched..` });
      }
    } catch (error) {
      handleError(res, error, "VerifyOtpForPassword");
    }
  }

  async getAllVendors(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = 1,
        limit = 8,
        search = "",
        category = "",
        location = "",
        sort,
      } = req.query;
      console.log(req.query);
      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);
      const sortValue = parseInt(sort as string, 10);
      const vendorData = await VendorService.getVendors(
        pageNumber,
        limitNumber,
        search.toString(),
        category.toString(),
        location.toString(),
        sortValue
      );
      const totalVendors = vendorData.length;
      const totalPages = Math.floor(totalVendors / limitNumber);
      res.status(200).json({ vendorData, totalPages });
    } catch (error) {
      handleError(res, error, "getAllVendors");
    }
  }

  async Toggleblock(req: Request, res: Response): Promise<void> {
    try {
      const VendorId: string | undefined = req.query.VendorId as
        | string
        | undefined;
      if (!VendorId) {
        throw new Error("Vendor ID is missing or invalid.");
      }

      await VendorService.toggleVendorBlock(VendorId);
      let process = await vendor.findOne({ _id: VendorId });
      res.status(200).json({
        message: "User block status toggled successfully.",
        process: !process?.isActive ? "block" : "unblock",
      });
    } catch (error) {
      handleError(res, error, "Toggleblock");
    }
  }

  async getVendor(req: Request, res: Response): Promise<void> {
    try {
      const vendorId: string = req.query.vendorid as string; // or req.query.Id?.toString()

      if (!vendorId) {
        res.status(400).json({ error: "Vendor ID is required." });
        return;
      }

      const data = await VendorService.getSingleVendor(vendorId);
      if (!data) {
        res.status(400).json({ error: "Vendor not found , error occured" });
      } else {
        res.status(200).json({ data: data });
      }
    } catch (error) {
      handleError(res, error, "getVendor");
    }
  }

  async ResetVendorPassword(req: Request, res: Response): Promise<void> {
    try {
      const password = req.body.password;
      const confirmPassword = req.body.confirm_password;
      if (password === confirmPassword) {
        const email = (req.session as any).vendorotp.email;
        const status = await VendorService.ResetVendorPasswordService(
          password,
          email
        );
        res.status(200).json({ message: "Password reset successfully." });
      } else {
        res.status(400).json({ error: "Passwords do not match." });
      }
    } catch (error) {
      handleError(res, error, "ResetVendorPassword");
    }
  }

  //Profile-Changepassword
  async updatePassword(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);

      const currentPassword = req.body.current_password;
      const newPassword = req.body.new_password;
      const vendorId: string = req.query.vendorid as string;
      console.log(vendorId);

      let status = await VendorService.checkCurrentPassword(
        currentPassword,
        vendorId
      );

      if (!status) {
        throw new CustomError(`Current password is wrong!`, 400);
      }

      const data = await VendorService.UpdatePasswordService(
        newPassword,
        vendorId
      );

      if (!data) {
        res
          .status(400)
          .json({ error: "couldn't update password..internal error." });
      }
      res.status(200).json({ message: "password updated successfully.." });
    } catch (error) {
      handleError(res, error, "updatePassword");
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const vendorId: string = req.query.vendorid as string; // Assuming vendorId is sent in the request body
      const formData = req.body;

      let coverpicFile,
        coverpicUrl = "";
      let logoFile,
        logoUrl = "";

      if (req.files) {
        if (
          typeof req.files === "object" &&
          "coverpic" in req.files &&
          Array.isArray(req.files["coverpic"])
        ) {
          coverpicFile = req.files["coverpic"][0];
          const coverpicUploadParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: coverpicFile?.originalname,
            Body: coverpicFile?.buffer,
            ContentType: coverpicFile?.mimetype,
          };

       

          const covercommand = new PutObjectCommand(coverpicUploadParams);
          await s3.send(covercommand);

          // const covercommand2 = new GetObjectCommand({
          //   Bucket: process.env.BUCKET_NAME!,
          //   Key: coverpicFile?.originalname,
          // });
          // coverpicUrl = await getSignedUrl(s3, covercommand2, { expiresIn: 86400 * 6 });

          coverpicUrl=`${process.env.IMAGE_URL}/${coverpicFile?.originalname}`
        }

        if (
          typeof req.files === "object" &&
          "logo" in req.files &&
          Array.isArray(req.files["logo"])
        ) {
          logoFile = req.files["logo"][0];
          const logoUploadParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: logoFile?.originalname,
            Body: logoFile?.buffer,
            ContentType: logoFile?.mimetype,
          };

          const logocommand = new PutObjectCommand(logoUploadParams);
          await s3.send(logocommand);

          // const logocommand2 = new GetObjectCommand({
          //   Bucket: process.env.BUCKET_NAME!,
          //   Key: logoFile?.originalname,
          // });
          // logoUrl = await getSignedUrl(s3, logocommand2, { expiresIn: 86400 * 6 });
          logoUrl=`${process.env.IMAGE_URL}/${logoFile?.originalname}`
        }
      }

      const vendor = await VendorService.getSingleVendor(vendorId);
      console.log(formData)

      const updatedVendor = await VendorService.updateVendor(
        vendorId,
        formData,
        coverpicUrl ? coverpicUrl : vendor.coverpicUrl,
        logoUrl ? logoUrl : vendor.logoUrl,
        logoFile?.originalname ? logoFile?.originalname : vendor.logo,
        coverpicFile?.originalname
          ? coverpicFile?.originalname
          : vendor.coverpic
      );

      res.status(200).json(updatedVendor);
    } catch (error) {
      handleError(res, error, "updateProfile");
    }
  }

  async sendVerifyRequest(req: Request, res: Response): Promise<void> {
    try {
      const vendorId: string = req.body.vendorId as string;
      const result = await VendorService.verificationRequest(vendorId);
      res.status(200).json(result);
    } catch (error) {
      handleError(res, error, "sendVerifyRequest");
    }
  }

  async updateVerifyStatus(req: Request, res: Response): Promise<void> {
    try {
      const vendorId: string = req.body.vendorId as string;
      const status = req.body.status;
      const result = await VendorService.changeVerifyStatus(vendorId, status);
      res.status(200).json({ result, message: "Status updated successfully!" });
    } catch (error) {
      handleError(res, error, "updateVerifyStatus");
    }
  }

  async addDates(req: Request, res: Response): Promise<void> {
    try {
      const vendorId: string = req.body.vendorId as string;
      const status = req.body.status;
      const date = req.body.date;
      console.log(vendorId, status, date);
      const bookedDates = await VendorService.addDateAvailability(
        vendorId,
        status,
        date
      );
      res.status(200).json({ bookedDates, message: "Date status updated!" });
    } catch (error) {
      handleError(res, error, "addDates");
    }
  }

  async loadDates(req: Request, res: Response): Promise<void> {
    try {
      const vendorId: string = req.query.vendorId as string;
      const bookedDates = await VendorService.getAllDates(vendorId);
      res.status(200).json({ bookedDates });
    } catch (error) {
      handleError(res, error, "loadDates");
    }
  }

  async getLocations(req: Request, res: Response): Promise<void> {
    try {
      const Locations = await VendorService.getAllLocations();
      res.status(200).json({ locations: Locations });
    } catch (error) {
      handleError(res, error, "getLocations");
    }
  }

  async getRevenue(req: Request, res: Response): Promise<void> {
    try {
      const vendorId = req.query.vendorId as string;
      const dateType = req.query.date as string;

      if (!vendorId || !Types.ObjectId.isValid(vendorId)) {
        res.status(400).json({ message: "Invalid or missing vendorId" });
        return;
      }

      let start,
        end,
        groupBy,
        sortField,
        arrayLength = 0;

      switch (dateType) {
        case "week":
          const { startOfWeek, endOfWeek } = getCurrentWeekRange();
          start = startOfWeek;
          end = endOfWeek;
          groupBy = { day: { $dayOfMonth: "$createdAt" } }; // Group by day
          sortField = "day"; // Sort by day
          arrayLength = 7;
          break;
        case "month":
          const { startOfYear, endOfYear } = getCurrentYearRange();
          start = startOfYear;
          end = endOfYear;
          groupBy = { month: { $month: "$createdAt" } }; // Group by month
          sortField = "month"; // Sort by month
          arrayLength = 12;
          break;
        case "year":
          const { startOfFiveYearsAgo, endOfCurrentYear } =
            getLastFiveYearsRange();
          start = startOfFiveYearsAgo;
          end = endOfCurrentYear;
          groupBy = { year: { $year: "$createdAt" } }; // Group by year
          sortField = "year"; // Sort by year
          arrayLength = 5;
          break;
        default:
          res.status(400).json({ message: "Invalid date parameter" });
          return;
      }

      const revenueData = await payment.aggregate([
        {
          $match: {
            vendorId: new Types.ObjectId(vendorId),
            createdAt: {
              $gte: start,
              $lt: end,
            },
          },
        },
        {
          $group: {
            _id: groupBy,
            totalRevenue: { $sum: "$amount" },
          },
        },
        {
          $sort: { [`_id.${sortField}`]: 1 },
        },
      ]);
      const revenueArray = Array.from({ length: arrayLength }, (_, index) => {
        const item = revenueData.find((r) => {
          if (dateType === "week") {
            return r._id.day === index + 1;
          } else if (dateType === "month") {
            return r._id.month === index + 1;
          } else if (dateType === "year") {
            return (
              r._id.year ===
              new Date().getFullYear() - (arrayLength - 1) + index
            );
          }
          return false;
        });
        return item ? item.totalRevenue : 0; // Default to 0 if no data for the expected index
      });

      res.status(200).json({ revenue: revenueArray });
    } catch (error) {
      handleError(res, error, "getRevenue");
    }
  }
}

export default new VendorController();
