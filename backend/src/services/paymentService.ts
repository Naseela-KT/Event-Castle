import mongoose from "mongoose";
import PaymentRepository from "../repositories/paymentRepository";
import Admin from "../models/adminModel";
import Booking from "../models/bookingModel";
import Notification from "../models/notificationModel";


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
          sender:userId,
          recipient: vendorId,
          message:"Payment completed!"
        })
        await vendorNotification.save();
        
        let AdminData=await Admin.findOne({});
        if (AdminData !== null && amount !== undefined) {
          AdminData.wallet += amount;
          await AdminData.save();
        }
  
        const adminNotification=new Notification({
          sender:userId,
          recipient:AdminData?._id,
          message:`${amount} got credited to wallet`
        })
        await adminNotification.save();
      return bookingData;
    } catch (error) {
      throw error;
    }
  }

  async getPayments () {
    try {
      const payment = await PaymentRepository.getAll();
      return payment;
    } catch (error) {
      throw error;
    }
  }
  
}


export default new PaymentService();

