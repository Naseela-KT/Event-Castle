import { Document } from "mongoose";
import Booking, { bookingDocument } from "../models/booking";
import vendor, { VendorDocument } from "../models/vendor";
import user, { UserDocument } from "../models/user";
import admin from "../models/admin";
import payment from "../models/payment";
import notification from "../models/notification";

export const checkDate = async (
  vendorId: string,
  date: string
): Promise<boolean> => {
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
};

export const createNewBooking = async (
  bookingData: Partial<bookingDocument>
): Promise<bookingDocument> => {
  try {
    const result = await Booking.create(bookingData);

    let vendorId = bookingData.vendorId;
    await vendor.findByIdAndUpdate(vendorId, {
      $push: { bookedDates: bookingData.date },
    });

    const newNotification=new notification({
      sender:bookingData.userId,
      recipient: bookingData.vendorId,
      message:"New event Booked!"
    })

    await newNotification.save();

    return result;
  } catch (error) {
    throw error;
  }
};

export const findBookingsByVendorId = async (
  vendorId: string,
  page: number, 
  pageSize: number
)=> {
  try {
    const skip = (page - 1) * pageSize;
    const bookings = await Booking.find({ vendorId: vendorId }).skip(skip).limit(pageSize).exec();
    const totalBookings=await Booking.countDocuments({ vendorId: vendorId })
    return {bookings,totalBookings};
  } catch (error) {
    throw error;
  }
};


export const findRefundForUser=async (
  userId: string,
  page: number, 
  pageSize: number
)=> {
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
};


export const findBookingsByUserId = async (
  userId: string,
  page: number, 
  pageSize: number
)=> {
  try {
    const skip = (page - 1) * pageSize;
    const bookings = await Booking.find({ userId: userId }).skip(skip).limit(pageSize).exec();
    const totalBookings=await Booking.countDocuments({ userId: userId })
    return {bookings,totalBookings};
  } catch (error) {
    throw error;
  }
};

export const findBookingsByBookingId = async (
  bookingId: string
): Promise<bookingDocument | {}> => {
  try {
    const result = await Booking.find({ _id: bookingId })
      .populate("userId")
      .populate("vendorId");
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateBookingStatusById = async (
  bookingId: string,
  status: string
) => {
  try {
    const booking = await Booking.findById(bookingId);

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
};
