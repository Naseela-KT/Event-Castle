import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createVendor , findAllVendors, findvendorByEmail } from '../repositories/vendorRepository';
import { ObjectId } from 'mongoose';
import { findVerndorIdByType } from '../repositories/vendorTypeRepository';
import vendor from '../models/vendor';


interface LoginResponse {
  token: string;
  vendorData: object; 
  message: string;
}

export const signup = async (email:string ,password:string, name:string , phone:number, city:string,vendor_type:string): Promise<string> => {
    try {
      const existingVendor = await findvendorByEmail(email);
      if (existingVendor) {
        throw new Error('vendor already exists');
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
          throw new Error('vendor not exists..');
        }
    
        const passwordMatch = await bcrypt.compare( password, existingVendor.password);

        if (!passwordMatch) {
        throw new Error('Incorrect password..');
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