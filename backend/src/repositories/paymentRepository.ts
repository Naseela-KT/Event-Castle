import admin from "../models/adminModel";
import booking from "../models/bookingModel";
import notification from "../models/notificationModel";
import payment, { paymentDocument } from "../models/paymentModel";

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
      const vendorNotification=new notification({
        sender:paymentData.userId,
        recipient: paymentData.vendorId,
        message:"Payment completed!"
      })
      await vendorNotification.save();
      
      let AdminData=await admin.findOne({});
      if (AdminData !== null && paymentData.amount !== undefined) {
        AdminData.wallet += paymentData.amount;
        await AdminData.save();
      }

      const adminNotification=new notification({
        sender:paymentData.userId,
        recipient:AdminData?._id,
        message:`${paymentData.amount} got credited to wallet`
      })
      await adminNotification.save();
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