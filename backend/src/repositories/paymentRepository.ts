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
      return result;
    } catch (error) {
      throw error;
    }
  };