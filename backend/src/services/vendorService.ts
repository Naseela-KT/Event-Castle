import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AddVendorReview, UpdatePassword, UpdateVendorPassword, addReviewReplyById, changeDateAvailability, createVendor , findAllDatesById, findAllReviews, findAllVendors, findVendorById, findvendorByEmail, getTotalVendorsCount, requestForVerification, updateVendorData, updateVerificationStatus } from '../repositories/vendorRepository';
import verndorTypeRepository from '../repositories/vendorTypeRepository';
import vendor,{VendorDocument} from '../models/vendorModel';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { CustomError } from '../error/customError';
import vendorTypeModel from '../models/vendorTypeModel';



interface LoginResponse {
  token: string;
  vendorData: object; 
  message: string;
  refreshToken:string;
}

export const signup = async (email:string ,password:string, name:string , phone:number, city:string,vendor_type:string): Promise<string> => {
    try {
      const existingVendor = await findvendorByEmail(email);
      if (existingVendor) {
        throw new CustomError('Vendor already exists',409);
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const isActive:boolean = true;
      const isVerified:boolean=false;
      const verificationRequest:boolean=false;
      const totalBooking:number=0;

      const vendorType=await vendorTypeModel.findOne({type:vendor_type});
      console.log("vendorTypeData"+vendorType)

      const newVendor = await createVendor({ email , password: hashedPassword , name , phone , city , isActive , isVerified , verificationRequest , totalBooking ,vendor_type:vendorType?._id});
  
      const token = jwt.sign({ _id: newVendor._id }, process.env.JWT_SECRET!);
     
      return token;

    } catch (error) {
      throw error;
    }
  };

  
export const createRefreshToken = async (refreshToken:string)=>{
  try {

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { _id: string };
    const Vendor = await vendor.findById(decoded._id);

    if (!Vendor || Vendor.refreshToken !== refreshToken) {
        throw new Error('Invalid refresh token');
      }

    const accessToken = jwt.sign({ _id: Vendor._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return accessToken;

  } catch (error) {
    
  }
}




  export const login = async (email:string , password : string): Promise<LoginResponse> =>{
    try {
        const existingVendor = await findvendorByEmail(email);
        if (!existingVendor) {
          throw new CustomError('vendor not exists..',404);
        }
    
        const passwordMatch = await bcrypt.compare( password, existingVendor.password);

        if (!passwordMatch) {
        throw new CustomError('Incorrect password..',401);
        }

        if(existingVendor.isActive===false){
          throw new CustomError('Cannot login..!Blocked by Admin...',401);
        }

        const vendorData = await findvendorByEmail(email);

        // If the password matches, generate and return a JWT token
        const token = jwt.sign({ _id: existingVendor._id }, process.env.JWT_SECRET!, { expiresIn: "1h"});

        let refreshToken = existingVendor.refreshToken;

   
        if (!refreshToken) {
         
          refreshToken = jwt.sign({ _id: existingVendor._id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
        }
    
    
        existingVendor.refreshToken = refreshToken;
        await existingVendor.save();
        return {refreshToken,token,vendorData:existingVendor,message:"Successfully logged in.."};
        
      } catch (error) {
        throw error;
      };


      
}


export const CheckExistingVendor = async(email:string)=>{
  try {
    const existingVendor = await findvendorByEmail(email);
    return existingVendor;
  } catch (error) {
    throw error
  }
}




export const getVendors=async(page: number,pageSize:number)=>{
  try {
    const vendors=await findAllVendors(page,pageSize);
    const totalVendorsCount = await getTotalVendorsCount();
    return { vendors, totalVendorsCount };
  } catch (error) {
    throw error;
  }
}


export const toggleVendorBlock = async(vendorId:string): Promise<void> =>{
  try {
    const Vendor = await vendor.findById(vendorId)
    if (!Vendor) {
        throw new Error('Vendor not found');
    }
    
    Vendor.isActive = !Vendor.isActive; // Toggle the isActive field
    await Vendor.save();
} catch (error) {
    throw error;
}

}


export const getSingleVendor = async(vendorId:string): Promise<VendorDocument> =>{
  try {
    const Vendor = await vendor.findById(vendorId)
    if (!Vendor) {
        throw new Error('Vendor not found');
    }
   return Vendor;
} catch (error) {
    throw error;
}

}


export const ResetVendorPasswordService = async(password:string , email:string)=>{
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const status = await UpdateVendorPassword(hashedPassword , email);
    if(!status.success){
      throw new Error(status.message)
    }
  } catch (error) {
    throw error;
  }
}

export const checkCurrentPassword = async(currentpassword:string , vendorId:string)=>{

  try {
    
    const existingVendor = await findVendorById(vendorId);
    console.log(existingVendor)

    if(!existingVendor){
     throw new CustomError("Vendor not found",404)
    }

    const passwordMatch = await bcrypt.compare(currentpassword, existingVendor.password);
    if (!passwordMatch) {
      throw new CustomError("Password doesn't match",401)
    }

    return passwordMatch; 

  } catch (error) {
    throw error;
  }
}

export const UpdatePasswordService = async(newPassword:string , vendorId:string)=>{
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const existingUser = await findVendorById(vendorId);
    if(!existingUser){
      throw new CustomError("user not found",404)
    }
    const email = existingUser.email;

    const updatedValue = await UpdatePassword(hashedPassword , email);
    if(updatedValue){
      return true;
    }
    return false
  } catch (error) {
    throw error;
  }
}

export const PushFavoriteVendor = async(content:string , rating:number , username:string , vendorid:string)=>{
  try {
    const data = await AddVendorReview(content , rating, username , vendorid)
    return  data;
  } catch (error) {
    throw error;
  }
}






export async function updateVendor(vendorId: string, formData: any, coverpicUrl: string|undefined, logoUrl: string|undefined,logo:string|undefined,coverpic:string|undefined): Promise<any> {
    try {
        console.log(vendorId, formData, coverpicUrl, logoUrl,logo,coverpic)
        await updateVendorData(vendorId, formData, coverpicUrl, logoUrl,logo,coverpic);
        const updatedVendor = await findVendorById(vendorId);

        return updatedVendor;
    } catch (error) {
        throw new Error('Failed to update vendor data');
    }
}


export async function addReviewReplyController(vendorId:string,content:string,reviewId:string): Promise<any> {
  try {
    const data=await addReviewReplyById(vendorId,content,reviewId)
    return data;
  } catch (error) {
    
  }
}


export async function verificationRequest(vendorId:string){
  try {
    const data=await requestForVerification(vendorId)
    return data
  } catch (error) {
    
  }
}


export async function changeVerifyStatus(vendorId:string,status:string){
  try {
    const data=await updateVerificationStatus(vendorId,status)
    return data
  } catch (error) {
    
  }
}

export async function getAllReviews(vendorId:string){
  try {
    const data=await findAllReviews(vendorId)
    return data
  } catch (error) {
    
  }
}

export async function addDateAvailability(vendorId:string,status:string,date:string){
  try {
    const data=await changeDateAvailability(vendorId,status,date)
    return data
  } catch (error) {
    
  }
}

export async function getAllDates(vendorId:string){
  try {
    const data=await findAllDatesById(vendorId)
    return data
  } catch (error) {
    
  }
}



