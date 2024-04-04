import mongoose from "mongoose";
import { createNewPaymnet } from "../repositories/paymentRepository";

export const addNewPayment=async(amount:number,userId:string,vendorId:string,bookingId:string): Promise<object>=>{
    try{
        const bookingIdObjectId =new mongoose.Types.ObjectId(bookingId) as unknown as mongoose.Schema.Types.ObjectId;
      const vendorIdObjectId =new mongoose.Types.ObjectId(vendorId) as unknown as mongoose.Schema.Types.ObjectId;
      const userIdObjectId=new mongoose.Types.ObjectId(userId) as unknown as mongoose.Schema.Types.ObjectId;
      const booking= await createNewPaymnet({amount,userId:userIdObjectId,vendorId:vendorIdObjectId,bookingId:bookingIdObjectId});
      return booking;
    } catch (error) {
      throw error;
    }
}


