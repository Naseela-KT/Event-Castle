import { CustomError } from "../error/customError";
import Payment, { PaymentDocument } from "../models/paymentModel";
import { BaseRepository } from "./baseRepository";


class PaymentRepository extends BaseRepository<PaymentDocument>{
  constructor(){
    super(Payment)
  }

  async findAllPayments(){
      const result=await Payment.find().populate('userId').populate('vendorId').populate('bookingId');
      return result;
  }

}

export default new PaymentRepository()




 