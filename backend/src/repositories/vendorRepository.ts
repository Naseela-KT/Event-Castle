

import mongoose from "mongoose";
import Vendor , {VendorDocument,Review} from "../models/vendorModel";
import vendor from "../models/vendorModel";
import { CustomError } from "../error/customError";
import admin from "../models/adminModel";
import notification from "../models/notificationModel";


export const createVendor = async (vendorData : Partial<VendorDocument>): Promise<VendorDocument> => {
    try {
      const Admin=await admin.findOne({})
     const newVendor=await vendor.create(vendorData);
      const adminNotification=new notification({
        sender:newVendor._id,
        recipient: Admin?._id,
        message:`New vendor registered!`
      })
      await adminNotification.save();
      return newVendor;
    } catch (error) {
      throw error;
    }
};

export const findvendorByEmail = async (email: string): Promise<VendorDocument | null> => {
    try {
      return await Vendor.findOne({ email });
    } catch (error) {
      throw error;
    }
};

export const findAllVendors = async (page: number,pageSize:number) => {
  try{
    const skip = (page - 1) * pageSize;
    let cursor = vendor.find({}).skip(skip).limit(pageSize);

    return await cursor.exec();
  } catch (error) {
    throw error;
  }
};




export const getTotalVendorsCount = async (): Promise<number> => {
  try {
    return await Vendor.countDocuments({});
  } catch (error) {
    throw error;
  }
};

export const UpdateVendorPassword = async(password:string , mail:string) =>{
  try {
    const result = await Vendor.updateOne({ email: mail }, { password: password });
    if (result.modifiedCount === 1) {
      return { success: true, message: "Vendor Password updated successfully." };
    } else {
      return { success: false, message: "Vendor not found or password not updated." };
    }
  } catch (error) {
    throw error;
  }
}


export const findVendorById = async (
  vendorId: string
): Promise<VendorDocument | null> => {
  try {
    return await Vendor.findById( vendorId );
  } catch (error) {
    throw error;
  }
};

export const UpdatePassword = async(password:string , mail:string) =>{
  try {
    const result = await Vendor.updateOne({ email: mail }, { password: password });
    if (result.modifiedCount === 1) {
      return { success: true, message: "Password updated successfully." };
    } else {
      return { success: false, message: "User not found or password not updated." };
    }
  } catch (error) {
    throw error;
  }
}



 export async function updateVendorData(vendorId: string, formData: any, coverpicUrl: string|undefined, logoUrl: string|undefined,logo:string|undefined,coverpic:string|undefined): Promise<void> {
  try {
      // Update coverpicUrl and logoUrl fields in vendor document
      console.log(vendorId)
      console.log("in repository......")
      console.log(coverpicUrl,logoUrl)
      console.log("name"+formData.name);

      const update = {
        name:formData.name,
        city:formData.city,
        phone:parseInt(formData.phone),
        coverpicUrl: coverpicUrl,
        logoUrl: logoUrl,
        logo: logo,
        coverpic: coverpic
      };
  
      // Use the $set operator to update the document
      await Vendor.updateOne({ _id: vendorId }, { $set: update });
       
    
    
  } catch (error) {
      throw new Error('Failed to update vendor data');
  }
}




export async function requestForVerification(vendorId:string){
  try {
    const data=await vendor.findByIdAndUpdate(vendorId,{$set:{verificationRequest:true}})
    return data;
  } catch (error) {
    
  }
}

export async function updateVerificationStatus(vendorId:string,status:string){
  try {
    const data=await vendor.findByIdAndUpdate(vendorId,{$set:{verificationRequest:false,isVerified: status === "Accepted"}})
    return data;
  } catch (error) {
    
  }
}

export async function findAllReviews(vendorId:string){
  try {
    const data=await vendor.findById(vendorId)
    const reviews = data?.reviews; 
    return reviews;
  } catch (error) {
    throw error
  }
}


export async function changeDateAvailability(vendorId:string,status:string,date:string){
  try {
    const Vendor=await vendor.findOne({_id:vendorId});
    let bookedDates=Vendor?.bookedDates;
    if(status==="Available"){
      if(bookedDates?.includes(date)){
        bookedDates = bookedDates.filter((bookedDate) => bookedDate !== date);
      }
    } else if (status === "Unavailable"){
      if (!bookedDates?.includes(date)) {
        bookedDates?.push(date);
      }
    }
    await Vendor?.updateOne({ bookedDates });
    return bookedDates
  } catch (error) {
    throw error
  }
}


export async function findAllDatesById(vendorId:string){
  try {
    const Vendor=await vendor.findOne({_id:vendorId});
    return Vendor?.bookedDates;
  } catch (error) {
    throw error
  }
}

