import { Request, Response } from "express";
import { acquireLockForDate, addABooking, checkIfDatePresent, getAllBookingsById, getAllBookingsByUser, getAllBookingsByVendor, releaseLockForDate, updateStatusById } from "../services/bookingService";
import { CustomError } from "../error/customError";





export const BookingController = {
    async bookAnEvent(req: Request, res: Response): Promise<void> {
      try {
        const vendorId: string = req.query.vendorId as string;
        const userId: string = req.query.userId as string;
        const eventName=req.body.eventName;
        const name=req.body.name;
        const city=req.body.city;
        const date=req.body.date;
        const pin=parseInt(req.body.pin);
        const mobile=parseInt(req.body.mobile);
        const DateAlreadyBooked  = await checkIfDatePresent(vendorId , date );
            
            if(DateAlreadyBooked){
              throw new CustomError("Sorry this date is not available!",404)
            }else{
              try {
                    await acquireLockForDate(vendorId, date);
                    const booking = await addABooking(eventName, name, city,date,pin,mobile,vendorId,userId);
                    await releaseLockForDate(vendorId, date);
                    res.status(201).json({booking:booking,message:"Booking done Successfully"});
              } catch (error) {
                    console.error("Error acquiring lock:", error);
                    res.status(400).json({ message: "Sorry, this date is currently not available." });
              }
         
            }
      } catch (error) {
        if (error instanceof CustomError) {
          res.status(error.statusCode).json({ message: error.message });
        } else {
          console.error(error);
          res.status(500).json({ message: "Server Error" });
        }
      }
    },

    async getBookingsByVendor(req: Request, res: Response): Promise<void> {
      try {
        const vendorId: string = req.query.vendorId as string;
        const bookings = await getAllBookingsByVendor(vendorId);
        res.status(201).json({bookings});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    },

    async getBookingsByUser(req: Request, res: Response): Promise<void> {
      try {
        const userId: string = req.query.userId as string;
        const page: number = parseInt(req.query.page as string) || 1;
      const pageSize: number = parseInt(req.query.pageSize as string) || 8;
        const { bookings, totalBookings } = await getAllBookingsByUser(userId,page,pageSize);
        const totalPages = Math.ceil(totalBookings / pageSize);
        res.status(201).json({bookings,totalPages: totalPages});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    },

    async getBookingsById(req: Request, res: Response): Promise<void> {
      try {
        const bookingId: string = req.query.bookingId as string;
        const bookings = await getAllBookingsById(bookingId);
        res.status(201).json({bookings});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    },

    async updateStatus(req: Request, res: Response): Promise<void> {
      try {
        const bookingId: string = req.query.bookingId as string;
        const status=req.body.status
        const bookings = await updateStatusById(bookingId,status);
        res.status(201).json({bookings});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    },

    async cancelBookingByUser(req: Request, res: Response): Promise<void> {
      try {
        const bookingId: string = req.query.bookingId as string;
        const status="Cancelled"
        const bookings = await updateStatusById(bookingId,status);
        res.status(201).json({bookings});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    },
    
  
  };