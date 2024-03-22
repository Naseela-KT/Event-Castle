import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AddVendorReview, UpdatePassword, UpdateVendorPassword, createVendor , findAllVendors, findVendorById, findvendorByEmail, updateVendorData } from '../repositories/vendorRepository';
import { findVerndorIdByType, getVendorById } from '../repositories/vendorTypeRepository';
import vendor,{VendorDocument} from '../models/vendor';
import { CustomError } from '../controllers/vendorController';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';





dotenv.config();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
  region: process.env.BUCKET_REGION!,
});


interface LoginResponse {
  token: string;
  vendorData: object; 
  message: string;
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

      const vendorType=await findVerndorIdByType(vendor_type);
      console.log("vendorTypeData"+vendorType)

      const newVendor = await createVendor({ email , password: hashedPassword , name , phone , city , isActive , isVerified , verificationRequest , totalBooking ,vendor_type:vendorType?._id});
  
      const token = jwt.sign({ _id: newVendor._id }, process.env.JWT_SECRET!);
     
      return token;

    } catch (error) {
      throw error;
    }
  };




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
        const token = jwt.sign({ _id: existingVendor._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return {token,vendorData:existingVendor,message:"Successfully logged in.."};
        
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



export const getVendors=async()=>{
  try {
    const vendors=await findAllVendors();
    return vendors;
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

export const PushFavoriteVendor = async(content:string , rating:number , userid:string , vendorid:string)=>{
  try {
    console.log("inside service " , rating)
    const data = await AddVendorReview(content , rating, userid , vendorid)
    return  data;
  } catch (error) {
    throw error;
  }
}



export async function uploadCoverpicAndLogo(coverpic: Express.Multer.File, logo: Express.Multer.File, vendorId: string): Promise<{ coverpicUrl: string, logoUrl: string }> {
   

    // Upload coverpic to S3
    const coverpicUploadParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: coverpic.originalname,
        Body: coverpic.buffer,
        ContentType: coverpic.mimetype,
    };
    const covercommand = new PutObjectCommand(coverpicUploadParams);
    await s3.send(covercommand);

    const getObjectParams={
      Bucket: process.env.BUCKET_NAME!,
      Key:  coverpic.originalname,
    }

    const covercommand2 = new GetObjectCommand(getObjectParams);
    const coverpicUrl = await getSignedUrl(s3, covercommand2,{expiresIn:36000});
  

    // Upload logo to S3
    const logoUploadParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: logo.originalname,
        Body: logo.buffer,
        ContentType: logo.mimetype,
    };

    const logocommand = new PutObjectCommand(logoUploadParams);
    await s3.send(logocommand);

    const getLogoObjectParams={
      Bucket: process.env.BUCKET_NAME!,
      Key:  logo.originalname,
    }

    const logocommand2 = new GetObjectCommand(getLogoObjectParams);
    const logoUrl = await getSignedUrl(s3, logocommand2,{expiresIn:36000});

    return { coverpicUrl, logoUrl };
}


export async function updateVendor(vendorId: string, formData: any, coverpicUrl: string, logoUrl: string): Promise<any> {
    try {
        // Update vendor data with coverpicUrl and logoUrl
        await updateVendorData(vendorId, formData, coverpicUrl, logoUrl);

        // Fetch updated vendor data
        const updatedVendor = await getVendorById(vendorId);

        return updatedVendor;
    } catch (error) {
        throw new Error('Failed to update vendor data');
    }
}



