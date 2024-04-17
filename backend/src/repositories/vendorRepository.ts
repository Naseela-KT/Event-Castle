<<<<<<< HEAD
<<<<<<< Updated upstream
import Vendor , {VendorDocument} from "../models/vendor";
=======
import mongoose from "mongoose";
import Vendor , {VendorDocument,Review} from "../models/vendor";
import vendor from "../models/vendor";
import { CustomError } from "../error/customError";

>>>>>>> Stashed changes
=======
import mongoose from "mongoose";
import Vendor , {VendorDocument,Review} from "../models/vendor";
import { CustomError } from "../controllers/vendorController";
import vendor from "../models/vendor";

>>>>>>> 4e6cb704a761a883846130ba00827a66247c2bb7

export const createVendor = async (vendorData : Partial<VendorDocument>): Promise<VendorDocument> => {
    try {
      return await Vendor.create(vendorData);
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

export const findAllVendors = async (): Promise<VendorDocument[] | null> => {
  try {
    return await Vendor.find({});
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

export const AddVendorReview = async(content: string, rating: number, username: string, vendorId: string)=>{
  try {
     const vendorData = await Vendor.findById(vendorId);
       if (!vendorData) {
         throw new Error('Vendor not found');
       }
       const reviewId = new mongoose.Types.ObjectId();
     vendorData.reviews.push({
      _id: reviewId,
       content, rating, username,
       date: new Date(),
       reply: []
     });
 
     await vendorData.save();
     return true;
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


export async function addReviewReplyById(vendorId: string, content: string, reviewId: string) {
  try {
    console.log("here in repository")
    const vendorData = await Vendor.findById(vendorId);
    if (!vendorData) {
      console.log('Vendor not found')
      throw new CustomError('Vendor not found', 404);
    }
    const review = vendorData.reviews.find((review: Review) => review._id.toString() === reviewId);
    console.log(review)
    if (!review) {
      console.log('Review not found')
      throw new CustomError('Review not found', 404);
    }
    const result = await Vendor.findByIdAndUpdate(
      vendorId,
      { $push: { 'reviews.$[review].reply': content } },
      {
        arrayFilters: [{ 'review._id': { $eq: new mongoose.Types.ObjectId(reviewId) } }],
        new: true 
      }
    );
    console.log(result)
    return result
   
  } catch (error) {
    throw new Error('Failed to add reply');
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

