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
  ): Promise<string> {
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

      return token;
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
      const Vendor = await vendorRepository.getById(decoded._id);
      if (!Vendor || Vendor.refreshToken !== refreshToken) {
        throw new Error("Invalid refresh token");
      }
      const accessToken = jwt.sign(
        { _id: Vendor._id },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );
      return accessToken;
    } catch (error) {}
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
      throw error;
    }
  }

  async CheckExistingVendor(email: string) {
    try {
      const existingVendor = await vendorRepository.findByEmail(email);
      return existingVendor;
    } catch (error) {
      throw error;
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
      throw error;
    }
  }


  async getVendorsCount(){
    try {
      const total = await vendorRepository.countDocuments();
      return total;
    } catch (error) {
      throw error;
    }
  }

  async toggleVendorBlock(vendorId: string): Promise<void>{
    try {
      const Vendor = await vendorRepository.getById(vendorId);
      if (!Vendor) {
        throw new Error("Vendor not found");
      }
  
      Vendor.isActive = !Vendor.isActive; // Toggle the isActive field
      await Vendor.save();
    } catch (error) {
      throw error;
    }
  }


  async getSingleVendor(
    vendorId: string
  ): Promise<VendorDocument>{
    try {
      const Vendor = await vendorRepository.getById(vendorId);
      if (!Vendor) {
        throw new Error("Vendor not found");
      }
      return Vendor;
    } catch (error) {
      throw error;
    }
  }


  async ResetVendorPasswordService(
    password: string,
    email: string
  ){
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const status = await vendorRepository.UpdateVendorPassword(hashedPassword, email);
      if (!status.success) {
        throw new Error(status.message);
      }
    } catch (error) {
      throw error;
    }
  }


  async checkCurrentPassword(
    currentpassword: string,
    vendorId: string
  ){
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
      throw error;
    }
  }

  async UpdatePasswordService(
    newPassword: string,
    vendorId: string
  ){ 
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      const existingUser = await vendorRepository.getById(vendorId);
      if (!existingUser) {
        throw new CustomError("user not found", 404);
      }
      const email = existingUser.email;
  
      const updatedValue = await vendorRepository.UpdatePassword(hashedPassword, email);
      if (updatedValue) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
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
        name:formData.name,
        city:formData.city,
        phone:parseInt(formData.phone),
        coverpicUrl: coverpicUrl,
        logoUrl: logoUrl,
        logo: logo,
        coverpic: coverpic
      };
      await vendorRepository.update(vendorId,update)
      const updatedVendor = await vendorRepository.getById(vendorId);
  
      return updatedVendor;
    } catch (error) {
      throw new Error("Failed to update vendor data");
    }
  }


  async verificationRequest(vendorId: string) {
    try {
      const data = await vendorRepository.requestForVerification(vendorId);
      return data;
    } catch (error) {}
  }

  async changeVerifyStatus(vendorId: string, status: string) {
    try {
      const data = await vendorRepository.updateVerificationStatus(vendorId, status);
      return data;
    } catch (error) {}
  }

  async addDateAvailability(
    vendorId: string,
    status: string,
    date: string
  ) {
    try {
      const data = await vendorRepository.changeDateAvailability(vendorId, status, date);
      return data;
    } catch (error) {}
  }

  async getAllDates(vendorId: string) {
    try {
      const data = await vendorRepository.getById(vendorId);
      return data?.bookedDates;
    } catch (error) {}
  }

  async getAllLocations() {
    try {
      const data = await vendorRepository.findAllLocations();
      return data;
    } catch (error) {}
  }
  
}


export default new VendorService();
















