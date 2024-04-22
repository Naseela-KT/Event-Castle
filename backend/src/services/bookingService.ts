import mongoose from "mongoose";
import Booking,{bookingDocument} from "../models/bookingModel";
import { checkDate, createNewBooking, findBookingsByBookingId, findBookingsByUserId, findBookingsByVendorId, findRefundForUser, updateBookingStatusById } from "../repositories/bookingRepository";
import vendor from "../models/vendorModel";


export const checkIfDatePresent = async(vendorId:string , date:string):Promise<boolean>=>{
  try {
    const value =  await checkDate(vendorId , date);
    return value? true : false;
  } catch (error) {
    throw error;
  }
}

export const acquireLockForDate = async (vendorId: string, date: string): Promise<void> => {
  try {
    const vendorData = await vendor.findById(vendorId);
   
    if (!vendorData) {
      throw new Error("Vendor not found");
    }

    const existingLock = vendorData.locks.find(lock => lock.date === date);
   
    if (existingLock && existingLock.isLocked) {
      throw new Error('Date is already locked');
    }

    vendorData.locks.push({
      date: date,
      isLocked: true
    });
    
    await vendorData.save();
  } catch (error) {
    throw error;
  }
}


export const releaseLockForDate=async (vendorId: string, date: string): Promise<void> =>{
  try {

    const vendorData = await vendor.findById(vendorId);
   
    if (!vendorData) {
      throw new Error("Vendor not found");
    }

    const lockIndex = vendorData.locks.findIndex(lock => lock.date === date);


    if (lockIndex !== -1) {
      vendorData.locks.splice(lockIndex, 1);
      await vendorData.save();
    }
  } catch (error) {
    throw error;
  }
}

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

export const getAllBookingsByVendor=async(vendorId:string,page: number, pageSize: number)=>{
  try{
    const {bookings,totalBookings}=await findBookingsByVendorId(vendorId,page,pageSize)
    return {bookings,totalBookings};
  } catch (error) {
    throw error;
  }
}

export const getAllRefunds=async(userId:string,page: number, pageSize: number)=>{
  try{
    const {refund,totalRefund}=await findRefundForUser(userId,page,pageSize)
    return {refund,totalRefund};
  } catch (error) {
    throw error;
  }
}

export const getAllBookingsByUser=async(userId:string,page: number, pageSize: number)=>{
  try{
    const {bookings,totalBookings}=await findBookingsByUserId(userId,page,pageSize)
    return {bookings,totalBookings};
  } catch (error) {
    throw error;
  }
}

export const getAllBookingsById=async(bookingId:string):Promise<bookingDocument|{
  
}>=>{
  try{
    const bookings=await findBookingsByBookingId(bookingId)
    return bookings;
  } catch (error) {
    throw error;
  }
}

export const updateStatusById=async(bookingId:string,status:string)=>{
  try{
    const bookings=await updateBookingStatusById(bookingId,status)
    return bookings;
  } catch (error) {
    throw error;
  }
}