import mongoose from "mongoose";
import PaymentRepository from "../repositories/paymentRepository";
import Admin from "../models/adminModel";
import Booking from "../models/bookingModel";
import Notification, { NOTIFICATION_TYPES } from "../models/notificationModel";
import { CustomError } from "../error/customError";


class PaymentService{
  async addNewPayment(
    amount: number,
    userId: string,
    vendorId: string,
    bookingId: string
  ): Promise<object>{
    try {
      const bookingIdObjectId = new mongoose.Types.ObjectId(
        bookingId
      ) as unknown as mongoose.Schema.Types.ObjectId;
      const vendorIdObjectId = new mongoose.Types.ObjectId(
        vendorId
      ) as unknown as mongoose.Schema.Types.ObjectId;
      const userIdObjectId = new mongoose.Types.ObjectId(
        userId
      ) as unknown as mongoose.Schema.Types.ObjectId;
  
      const existingPayment = await PaymentRepository.findOne({ bookingId:bookingId });
        console.log(existingPayment)
        if (existingPayment) {
          return existingPayment;
        }
  
  
        const bookingData = await PaymentRepository.create({
          amount,
          userId: userIdObjectId,
          vendorId: vendorIdObjectId,
          bookingId: bookingIdObjectId,
        });
  
        await Booking.findByIdAndUpdate(bookingId,{$set:{payment_status:"Completed"}})
        const vendorNotification=new Notification({
          recipient: vendorId,
          message:"Payment completed!",
          type:NOTIFICATION_TYPES.PAYMENT
        })
        await vendorNotification.save();
        
        let AdminData=await Admin.findOne({});
        if (AdminData !== null && amount !== undefined) {
          AdminData.wallet += amount;
          await AdminData.save();
        }
  
        const adminNotification=new Notification({
          recipient:AdminData?._id,
          message:`${amount} got credited to wallet`,
          type:NOTIFICATION_TYPES.WALLET
        })
        await adminNotification.save();
      return bookingData;
    } catch (error) {
      console.error("Error in addNewPayment:", error)
      throw new CustomError("Failed to add new payment.", 500);
    }
  }

  async getPayments (page: number, pageSize: number) {
    try {
      return await PaymentRepository.findAllPayments(page, pageSize);
    } catch (error) {
      console.error("Error in getPayments:", error)
      throw new CustomError("Failed to retrieve payments.", 500);
    }
  }
  
}


export default new PaymentService();

