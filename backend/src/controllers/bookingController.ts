import { Request, Response } from "express";
import { addABooking, getAllBookingsById, getAllBookingsByUser, getAllBookingsByVendor, updateStatusById } from "../services/bookingService";





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
        console.log(req.body)
  
        const booking = await addABooking(eventName, name, city,date,pin,mobile,vendorId,userId);
        res.status(201).json({booking:booking,message:"Booking done Successfully! Check profile for updates!"});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
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
        const bookings = await getAllBookingsByUser(userId);
        res.status(201).json({bookings});
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