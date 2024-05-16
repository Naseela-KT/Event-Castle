
import { CustomError } from "../error/customError";
import Booking, { bookingDocument } from "../models/bookingModel";
import { BaseRepository } from "./baseRepository";



class BookingRepository extends BaseRepository<bookingDocument>{
  constructor(){
    super(Booking)
  }

  async findBookingsByVendorId(
    vendorId: string,
    page: number, 
    pageSize: number
  ){
    try {
      const skip = (page - 1) * pageSize;
      const bookings = await Booking.find({ vendorId: vendorId }).sort({createdAt:-1}).skip(skip).limit(pageSize).exec();
      const totalBookings=await Booking.countDocuments({ vendorId: vendorId })
      return {bookings,totalBookings};
    } catch (error) {
      console.error("Error in findBookingsByVendorId:", error)
      throw new CustomError("Failed to find bookings by vendor ID.", 500);
    }
  }

  async findRefundForUser(
    userId: string,
    page: number, 
    pageSize: number
  ){
    try {
      const skip = (page - 1) * pageSize;
      const bookings = await Booking.find({ userId: userId, refundAmount: { $ne: 0 } })
      .populate("vendorId")
        .skip(skip)
        .limit(pageSize)
        .exec();
      const totalBookings=await Booking.countDocuments({ userId: userId, refundAmount: { $ne: 0 } })
      return {refund:bookings,totalRefund:totalBookings};
    } catch (error) {
      console.error("Error in findRefundForUser:", error)
      throw new CustomError("Failed to find refunds for user.", 500);
    }
  }

  async findBookingsByUserId(
    userId: string,
    page: number, 
    pageSize: number
  ){
    try {
      const skip = (page - 1) * pageSize;
      const bookings = await Booking.find({ userId: userId }).populate("vendorId").sort({createdAt:-1}).skip(skip).limit(pageSize).exec();
      const totalBookings=await Booking.countDocuments({ userId: userId })
      return {bookings,totalBookings};
    } catch (error) {
      console.error("Error in findBookingsByUserId:", error)
      throw new CustomError("Failed to find bookings by user ID.", 500);
    }
  }

  async findBookingsByBookingId(
    bookingId: string
  ): Promise<bookingDocument | {}>{
    try {
      const result = await Booking.find({ _id: bookingId })
        .populate("userId")
        .populate("vendorId");
      return result;
    } catch (error) {
      console.error("Error in findBookingsByBookingId:", error)
      throw new CustomError("Failed to find booking by ID.", 500);
    }
  }

 
  



}

export default new BookingRepository()

