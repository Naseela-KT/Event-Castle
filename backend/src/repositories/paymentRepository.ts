import { CustomError } from "../error/customError";
import Payment, { PaymentDocument } from "../models/paymentModel";
import { BaseRepository } from "./baseRepository";

class PaymentRepository extends BaseRepository<PaymentDocument> {
  constructor() {
    super(Payment);
  }

  async findAllPayments(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const payment = await Payment.find()
      .populate("userId")
      .populate("vendorId")
      .populate("bookingId")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(pageSize);

      const count = await Payment.countDocuments({});
    return {payment,count};
  }
}

export default new PaymentRepository();
