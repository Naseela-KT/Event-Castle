
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
      const bookings = await Booking.find({ vendorId: vendorId }).skip(skip).limit(pageSize).exec();
      const totalBookings=await Booking.countDocuments({ vendorId: vendorId })
      return {bookings,totalBookings};
    } catch (error) {
      throw error;
    }
  }

  async findRefundForUser(
    userId: string,
    page: number, 
    pageSize: number
  ){
    try {
      const skip = (page - 1) * pageSize;
      const bookings = await Booking.find({ userId: userId, refundAmount: { $ne: 0 } }) // Filtering where refundAmount is not equal to "0"
        .skip(skip)
        .limit(pageSize)
        .exec();
      const totalBookings=await Booking.countDocuments({ userId: userId, refundAmount: { $ne: 0 } })
      return {refund:bookings,totalRefund:totalBookings};
    } catch (error) {
      throw error;
    }
  }

  async findBookingsByUserId(
    userId: string,
    page: number, 
    pageSize: number
  ){
    try {
      const skip = (page - 1) * pageSize;
      const bookings = await Booking.find({ userId: userId }).skip(skip).limit(pageSize).exec();
      const totalBookings=await Booking.countDocuments({ userId: userId })
      return {bookings,totalBookings};
    } catch (error) {
      throw error;
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
      throw error;
    }
  }

 
  



}

export default new BookingRepository()

