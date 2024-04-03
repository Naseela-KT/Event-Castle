import Booking, { bookingDocument } from "../models/booking";
import vendor from "../models/vendor";

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
    const result = await Booking.find({ _id: bookingId });
    return result;
  } catch (error) {
    throw error;
  }
};