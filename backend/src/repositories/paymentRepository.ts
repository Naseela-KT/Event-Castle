import admin from "../models/admin";
import booking from "../models/booking";
import payment, { paymentDocument } from "../models/payment";

export const createNewPaymnet = async (
    paymentData: Partial<paymentDocument>
  ): Promise<paymentDocument> => {
    try {
      const existingPayment = await payment.findOne({ bookingId: paymentData.bookingId });
      console.log(existingPayment)
      if (existingPayment) {
        return existingPayment;
      }
      const result = await payment.create(paymentData);
      await booking.findByIdAndUpdate(paymentData.bookingId,{$set:{payment_status:"Completed"}})
      await admin.updateMany({}, {$inc: {wallet: paymentData.amount}});
      return result;
    } catch (error) {
      throw error;
    }
  };


  export const findAllPayments=async():Promise<paymentDocument[]>=>{
    try {
      const result=await payment.find().populate('userId').populate('vendorId').populate('bookingId');
      return result
    } catch (error) {
      throw error;
    }
  }