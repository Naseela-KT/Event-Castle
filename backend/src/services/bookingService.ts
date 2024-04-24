import mongoose from "mongoose";
import Booking, { bookingDocument } from "../models/bookingModel";
import BookingRepository from "../repositories/bookingRepository";
import vendor from "../models/vendorModel";
import notification from "../models/notificationModel";
import payment from "../models/paymentModel";
import user from "../models/userModel";
import admin from "../models/adminModel";

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
      throw error;
    }
  }

  async acquireLockForDate(vendorId: string, date: string): Promise<void> {
    try {
      const vendorData = await vendor.findById(vendorId);

      if (!vendorData) {
        throw new Error("Vendor not found");
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
      throw error;
    }
  }

  async releaseLockForDate(vendorId: string, date: string): Promise<void> {
    try {
      const vendorData = await vendor.findById(vendorId);

      if (!vendorData) {
        throw new Error("Vendor not found");
      }

      const lockIndex = vendorData.locks.findIndex(
        (lock) => lock.date === date
      );

      if (lockIndex !== -1) {
        vendorData.locks.splice(lockIndex, 1);
        await vendorData.save();
      }
    } catch (error) {
      throw error;
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
        sender: userId,
        recipient: vendorId,
        message: "New event Booked!",
      });

      await newNotification.save();
      return booking;
    } catch (error) {
      throw error;
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
      throw error;
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
      throw error;
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
      throw error;
    }
  }

  async getAllBookingsById(bookingId: string): Promise<bookingDocument | {}> {
    try {
      const bookings = await BookingRepository.findBookingsByBookingId(bookingId);
      return bookings;
    } catch (error) {
      throw error;
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
          sender:booking.vendorId,
          recipient: booking.userId,
          message:"Booking is rejected By Vendor"
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
            sender:booking.userId,
            recipient: booking.vendorId,
            message:"Booking Cancelled by user"
          })
      
          await newNotification.save();
        }
      }
      const result = await Booking.findByIdAndUpdate(bookingId, {
        $set: { status: status}
      });
      await vendor.findByIdAndUpdate(booking.vendorId, {$inc: { totalBooking: 1 }})
      const newNotification=new notification({
        sender:booking.vendorId,
        recipient: booking.userId,
        message:"Booking Accepted by vendor"
      })
  
      await newNotification.save();
      
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new BookingService();
