import mongoose from "mongoose";
import Booking, { bookingDocument } from "../models/bookingModel";
import BookingRepository from "../repositories/bookingRepository";
import vendor from "../models/vendorModel";
import notification, { NOTIFICATION_TYPES } from "../models/notificationModel";
import payment from "../models/paymentModel";
import user from "../models/userModel";
import admin from "../models/adminModel";
import { CustomError } from "../error/customError";

class BookingService {
  async checkIfDatePresent(vendorId: string, date: string): Promise<boolean> {
    try {
      const vendorData = await vendor.findById(vendorId);
      if (!vendorData) {
        throw new Error("Vendor not found");
      }
      const isBooked = vendorData.bookedDates.includes(date);
      return isBooked ? true : false;
    } catch (error) {
      console.error("Error checking dates:", error);
      throw new CustomError("Error checking dates", 500);
    }
  }

  async acquireLockForDate(vendorId: string, date: string): Promise<void> {
    try {
      const vendorData = await vendor.findById(vendorId);

      if (!vendorData) {
        throw new CustomError("Vendor not found",404);
      }

      const existingLock = vendorData.locks.find((lock) => lock.date === date);

      if (existingLock && existingLock.isLocked) {
        throw new Error("Date is already locked");
      }

      vendorData.locks.push({
        date: date,
        isLocked: true,
      });

      await vendorData.save();
    } catch (error) {
      console.error("Error aquiring locks:", error);
      throw new CustomError("Error aquiring locks", 500);
    }
  }

  async releaseLockForDate(vendorId: string, date: string): Promise<void> {
    try {
      const vendorData = await vendor.findById(vendorId);

      if (!vendorData) {
        throw new CustomError("Vendor not found",404);
      }

      const lockIndex = vendorData.locks.findIndex(
        (lock) => lock.date === date
      );

      if (lockIndex !== -1) {
        vendorData.locks.splice(lockIndex, 1);
        await vendorData.save();
      }
    } catch (error) {
      console.error("Error releasing lock for dates:", error);
      throw new CustomError("Unable to release lock for dates", 500);
    }
  }

  async addABooking(
    eventName: string,
    name: string,
    city: string,
    date: string,
    pin: number,
    mobile: number,
    vendorId: string,
    userId: string
  ): Promise<object> {
    try {
      const vendorIdObjectId = new mongoose.Types.ObjectId(
        vendorId
      ) as unknown as mongoose.Schema.Types.ObjectId;
      const userIdObjectId = new mongoose.Types.ObjectId(
        userId
      ) as unknown as mongoose.Schema.Types.ObjectId;
      const booking = await BookingRepository.create({
        eventName,
        name,
        city,
        date,
        pin,
        mobile,
        vendorId: vendorIdObjectId,
        userId: userIdObjectId,
      });

      await vendor.findByIdAndUpdate(vendorId, {
        $push: { bookedDates: date },
      });

      const newNotification = new notification({
        recipient: vendorId,
        message: "New event Booked!",
        type:NOTIFICATION_TYPES.BOOKING
      });

      await newNotification.save();
      return booking;
    } catch (error) {
      console.error("Error creating a booking:", error);
      throw new CustomError("Unable to create booking", 500);
    }
  }

  async getAllBookingsByVendor(
    vendorId: string,
    page: number,
    pageSize: number
  ) {
    try {
      const { bookings, totalBookings } = await BookingRepository.findBookingsByVendorId(
        vendorId,
        page,
        pageSize
      );
      return { bookings, totalBookings };
    } catch (error) {
      console.error("Error fetching booking for vendor:", error);
      throw new CustomError("Unable fetch vendor booking", 500);
    }
  }

  async getAllRefunds(userId: string, page: number, pageSize: number) {
    try {
      const { refund, totalRefund } = await BookingRepository.findRefundForUser(
        userId,
        page,
        pageSize
      );
      return { refund, totalRefund };
    } catch (error) {
      console.error("Error fetching booking for vendor:", error);
      throw new CustomError("Unable fetch vendor booking", 500);
    }
  }

  async getAllBookingsByUser(userId: string, page: number, pageSize: number) {
    try {
      const { bookings, totalBookings } = await BookingRepository.findBookingsByUserId(
        userId,
        page,
        pageSize
      );
      return { bookings, totalBookings };
    } catch (error) {
      console.error("Error fetching booking for user:", error);
      throw new CustomError("Unable fetch user booking", 500);
    }
  }

  async getAllBookingsById(bookingId: string): Promise<bookingDocument | {}> {
    try {
      const bookings = await BookingRepository.findBookingsByBookingId(bookingId);
      return bookings;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw new CustomError("Unable fetch bookings", 500);
    }
  }

  async updateStatusById(bookingId: string, status: string) {
    try {
      const booking = await BookingRepository.getById(bookingId);
  
      if (!booking) {
        throw new Error("Booking not found");
      }
  
      if (status === "Rejected" || status === "Cancelled") {
        const { vendorId, date } = booking;
  
        await vendor.findByIdAndUpdate(vendorId, {
          $pull: { bookedDates: date },
        });
  
        const Payment = await payment.findOne({ bookingId: bookingId });
  
        const newNotification=new notification({
          recipient: booking.userId,
          message:"Booking is rejected By Vendor",
          type:NOTIFICATION_TYPES.STATUS
        })
    
        await newNotification.save();
  
        if (status == "Cancelled" && Payment) {
          const { userId } = booking;
          const User = await user.findById(userId);
          const Admin = await admin.findOne();
          if (!User || !Admin) {
            throw new Error("User or admin not found");
          }
  
          User.wallet += 500;
          await User.save();
          Admin.wallet -= 500;
          await Admin.save();
  
          booking.refundAmount += 500;
          await booking.save();
  
          const newNotification=new notification({
            recipient: booking.vendorId,
            message:"Booking Cancelled by user",
            type:NOTIFICATION_TYPES.STATUS
          })
      
          await newNotification.save();
        }
      }
      const result = await Booking.findByIdAndUpdate(bookingId, {
        $set: { status: status}
      });
      await vendor.findByIdAndUpdate(booking.vendorId, {$inc: { totalBooking: 1 }})
      const newNotification=new notification({
        recipient: booking.userId,
        message:"Booking Accepted by vendor",
        type:NOTIFICATION_TYPES.STATUS
      })
  
      await newNotification.save();
      
      return result;
    } catch (error) {
      console.error("Error updating status:", error);
      throw new CustomError("Unable to update booking status", 500);
    }
  }
}

export default new BookingService();
