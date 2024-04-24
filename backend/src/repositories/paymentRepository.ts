import Payment, { PaymentDocument } from "../models/paymentModel";
import { BaseRepository } from "./baseRepository";


class PaymentRepository extends BaseRepository<PaymentDocument>{
  constructor(){
    super(Payment)
  }

  async findAllPayments(){
    try {
      const result=await Payment.find().populate('userId').populate('vendorId').populate('bookingId');
      return result
    } catch (error) {
      throw error;
    }
  }

}

export default new PaymentRepository()




 