import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UpdatePassword, UpdateVendorPassword, createVendor , findAllVendors, findVendorById, findvendorByEmail } from '../repositories/vendorRepository';
import { findVerndorIdByType } from '../repositories/vendorTypeRepository';
import vendor,{VendorDocument} from '../models/vendor';
import { CustomError } from '../controllers/vendorController';


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


