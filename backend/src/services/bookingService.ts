import mongoose from "mongoose";
import Booking,{bookingDocument} from "../models/booking";
import { createNewBooking, findBookingsByUserId, findBookingsByVendorId } from "../repositories/bookingRepository";


export const addABooking=async(eventName:string, name:string, city:string,date:string,pin:number,mobile:number,vendorId:string,userId:string): Promise<object>=>{
    try{
      const vendorIdObjectId =new mongoose.Types.ObjectId(vendorId) as unknown as mongoose.Schema.Types.ObjectId;
      const userIdObjectId=new mongoose.Types.ObjectId(userId) as unknown as mongoose.Schema.Types.ObjectId;
      const booking= await createNewBooking({eventName, name, city,date,pin,mobile, vendorId:vendorIdObjectId,userId:userIdObjectId});
      return booking;
    } catch (error) {
      throw error;
    }
}

export const getAllBookingsByVendor=async(vendorId:string):Promise<bookingDocument[]>=>{
  try{
    const bookings=await findBookingsByVendorId(vendorId)
    return bookings;
  } catch (error) {
    throw error;
  }
}

export const getAllBookingsByUser=async(userId:string):Promise<bookingDocument[]>=>{
  try{
    const bookings=await findBookingsByUserId(userId)
    return bookings;
  } catch (error) {
    throw error;
  }
}