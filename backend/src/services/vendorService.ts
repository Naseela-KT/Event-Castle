import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import vendorRepository from "../repositories/vendorRepository";
import { VendorDocument } from "../models/vendorModel";
import { CustomError } from "../error/customError";
import vendorTypeRepository from "../repositories/vendorTypeRepository";
import adminRepository from "../repositories/adminRepository";
import notificationRepository from "../repositories/notificationRepository";
import { NOTIFICATION_TYPES } from "../models/notificationModel";

interface LoginResponse {
  token: string;
  vendorData: object;
  message: string;
  refreshToken: string;
}

class VendorService {
  async signup(
    email: string,
    password: string,
    name: string,
    phone: number,
    city: string,
    vendor_type: string
  ) {
    try {
      const existingVendor = await vendorRepository.findByEmail(email);
      if (existingVendor) {
        throw new CustomError("Vendor already exists", 409);
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const isActive: boolean = true;
      const isVerified: boolean = false;
      const verificationRequest: boolean = false;
      const totalBooking: number = 0;

      const vendorType = await vendorTypeRepository.findByType(vendor_type);

      const newVendor = await vendorRepository.create({
        email,
        password: hashedPassword,
        name,
        phone,
        city,
        isActive,
        isVerified,
        verificationRequest,
        totalBooking,
        vendor_type: vendorType?._id,
      });
      const token = jwt.sign({ _id: newVendor._id }, process.env.JWT_SECRET!);

      const Admin = await adminRepository.findOne({});
      const adminNotification = await notificationRepository.create({
        recipient: Admin?._id,
        message: `New vendor registered!`,
        type: NOTIFICATION_TYPES.NEW_VENDOR,
      });

      return {vendor:newVendor,token};
    } catch (error) {
      console.error("Error in signup:", error);
      throw new CustomError("Failed to create new vendor.", 500);
    }
  }

  async createRefreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      ) as { _id: string };
      const Vendor = await vendorRepository.getById(decoded._id);
      if (!Vendor || Vendor.refreshToken !== refreshToken) {
        throw new CustomError("Invalid refresh token.", 401);
      }
      const accessToken = jwt.sign(
        { _id: Vendor._id },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );
      return accessToken;
    } catch (error) {
      console.error("Error in createRefreshToken:", error);
      throw new CustomError("Failed to create refresh token.", 500);
    }
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const existingVendor = await vendorRepository.findByEmail(email);
      if (!existingVendor) {
        throw new CustomError("vendor not exists..", 404);
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingVendor.password
      );

      if (!passwordMatch) {
        throw new CustomError("Incorrect password..", 401);
      }

      if (existingVendor.isActive === false) {
        throw new CustomError("Cannot login..!Blocked by Admin...", 401);
      }

      const vendorData = await vendorRepository.findByEmail(email);

      // If the password matches, generate and return a JWT token
      const token = jwt.sign(
        { _id: existingVendor._id },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      let refreshToken = existingVendor.refreshToken;

      if (!refreshToken) {
        refreshToken = jwt.sign(
          { _id: existingVendor._id },
          process.env.JWT_REFRESH_SECRET!,
          { expiresIn: "7d" }
        );
      }

      existingVendor.refreshToken = refreshToken;
      await existingVendor.save();
      return {
        refreshToken,
        token,
        vendorData: existingVendor,
        message: "Successfully logged in..",
      };
    } catch (error) {
      console.error("Error in login:", error);
      throw new CustomError("Failed to log in.", 500);
    }
  }

  async CheckExistingVendor(email: string) {
    try {
      const existingVendor = await vendorRepository.findByEmail(email);
      return existingVendor;
    } catch (error) {
      console.error("Error in CheckExistingVendor:", error);
      throw new CustomError("Failed to check existing vendor.", 500);
    }
  }

  async getVendors(
    page: number,
    limit: number,
    search: string,
    category: string,
    location: string,
    sortValue: number
  ) {
    try {
      const vendors = await vendorRepository.findAllVendors(
        page,
        limit,
        search,
        category,
        location,
        sortValue
      );
      return vendors;
    } catch (error) {
      console.error("Error in getVendors:", error);
      throw new CustomError("Failed to get vendors.", 500);
    }
  }

  async getVendorsCount() {
    try {
      const total = await vendorRepository.countDocuments();
      return total;
    } catch (error) {
      console.error("Error in getVendorsCount:", error);
      throw new CustomError("Failed to get vendors count.", 500);
    }
  }

  async toggleVendorBlock(vendorId: string): Promise<void> {
    try {
      const Vendor = await vendorRepository.getById(vendorId);
      if (!Vendor) {
        throw new CustomError("Vendor not found.", 404);
      }

      Vendor.isActive = !Vendor.isActive; // Toggle the isActive field
      await Vendor.save();
    } catch (error) {
      console.error("Error in toggleVendorBlock:", error);
      throw new CustomError("Failed to toggle vendor block.", 500);
    }
  }

  async getSingleVendor(vendorId: string): Promise<VendorDocument> {
    try {
      const Vendor = await vendorRepository.getById(vendorId);
      if (!Vendor) {
        throw new CustomError("Vendor not found.", 404);
      }
      return Vendor;
    } catch (error) {
      console.error("Error in getSingleVendor:", error);
      throw new CustomError("Failed to retrieve vendor.", 500);
    }
  }

  async ResetVendorPasswordService(password: string, email: string) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const status = await vendorRepository.UpdateVendorPassword(
        hashedPassword,
        email
      );
      if (!status.success) {
        throw new CustomError("Failed to reset password.", 500);
      }
    } catch (error) {
      console.error("Error in ResetVendorPasswordService:", error);
      throw new CustomError("Failed to reset vendor password.", 500);
    }
  }

  async checkCurrentPassword(currentpassword: string, vendorId: string) {
    try {
      const existingVendor = await vendorRepository.getById(vendorId);
      console.log(existingVendor);

      if (!existingVendor) {
        throw new CustomError("Vendor not found", 404);
      }

      const passwordMatch = await bcrypt.compare(
        currentpassword,
        existingVendor.password
      );
      if (!passwordMatch) {
        throw new CustomError("Password doesn't match", 401);
      }

      return passwordMatch;
    } catch (error) {
      console.error("Error in checkCurrentPassword:", error);
      throw new CustomError("Failed to check current password.", 500);
    }
  }

  async UpdatePasswordService(newPassword: string, vendorId: string) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const existingUser = await vendorRepository.getById(vendorId);
      if (!existingUser) {
        throw new CustomError("user not found", 404);
      }
      const email = existingUser.email;

      const updatedValue = await vendorRepository.UpdatePassword(
        hashedPassword,
        email
      );
      if (updatedValue) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error in UpdatePasswordService:", error);
      throw new CustomError("Failed to update password.", 500);
    }
  }

  async updateVendor(
    vendorId: string,
    formData: any,
    coverpicUrl: string | undefined,
    logoUrl: string | undefined,
    logo: string | undefined,
    coverpic: string | undefined
  ): Promise<any> {
    try {
      const update = {
        name: formData.name,
        city: formData.city,
        phone: parseInt(formData.phone),
        coverpicUrl: coverpicUrl,
        logoUrl: logoUrl,
        logo: logo,
        coverpic: coverpic,
      };
      await vendorRepository.update(vendorId, update);
      const updatedVendor = await vendorRepository.getById(vendorId);

      return updatedVendor;
    } catch (error) {
      console.error("Error in updateVendor:", error);
      throw new CustomError("Failed to update vendor.", 500);
    }
  }

  async verificationRequest(vendorId: string) {
    try {
      const data = await vendorRepository.requestForVerification(vendorId);
      return data;
    } catch (error) {
      console.error("Error in verificationRequest:", error);
      throw new CustomError("Failed to request verification.", 500);
    }
  }

  async changeVerifyStatus(vendorId: string, status: string) {
    try {
      const data = await vendorRepository.updateVerificationStatus(
        vendorId,
        status
      );
      return data;
    } catch (error) {
      console.error("Error in changeVerifyStatus:", error);
      throw new CustomError("Failed to change verification status.", 500);
    }
  }

  async addDateAvailability(vendorId: string, status: string, date: string) {
    try {
      const data = await vendorRepository.changeDateAvailability(
        vendorId,
        status,
        date
      );
      return data;
    } catch (error) {
      console.error("Error in addDateAvailability:", error);
      throw new CustomError("Failed to add date availability.", 500);
    }
  }

  async getAllDates(vendorId: string) {
    try {
      const data = await vendorRepository.getById(vendorId);
      return data?.bookedDates;
    } catch (error) {
      console.error("Error in getAllDates:", error);
      throw new CustomError("Failed to get all dates.", 500);
    }
  }

  async getAllLocations() {
    try {
      const data = await vendorRepository.findAllLocations();
      return data;
    } catch (error) {
      console.error("Error in getAllLocations:", error);
      throw new CustomError("Failed to get all locations.", 500);
    }
  }
}

export default new VendorService();
