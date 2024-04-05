import { Document } from "mongoose";
import Booking, { bookingDocument } from "../models/booking";
import vendor, { VendorDocument } from "../models/vendor";
import user, { UserDocument } from "../models/user";



export const createNewBooking = async (
  bookingData: Partial<bookingDocument>
): Promise<bookingDocument> => {
  try {
    const result = await Booking.create(bookingData);

    let vendorId = bookingData.vendorId;
    await vendor.findByIdAndUpdate(vendorId, {
      $push: { bookedDates: bookingData.date },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

export const findBookingsByVendorId = async (
  vendorId: string
): Promise<bookingDocument[]> => {
  try {
    const result = await Booking.find({ vendorId: vendorId });
    return result;
  } catch (error) {
    throw error;
  }
};


export const findBookingsByUserId=async (
  userId: string
): Promise<bookingDocument[]> => {
  try {
    const result = await Booking.find({ userId: userId });
    return result;
  } catch (error) {
    throw error;
  }
};

export const findBookingsByBookingId=async (
  bookingId: string
): Promise<bookingDocument|{}> => {
  try {
    const result = await Booking.find({ _id: bookingId }).populate('userId').populate('vendorId');
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateBookingStatusById=async (
  bookingId: string,
  status:string
) => {
  try {
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      throw new Error('Booking not found');
    }
    
    if (booking.status === 'Rejected') {
      const { vendorId, date } = booking;
      
      await vendor.findByIdAndUpdate(vendorId, {
        $pull: { bookedDates: date }
      });
    }
    const result = await Booking.findByIdAndUpdate(bookingId,{$set:{status:status}});
    return result
    
  } catch (error) {
    throw error;
  }
};

