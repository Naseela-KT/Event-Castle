import { Request, Response } from "express";
const Stripe = require("stripe");
import PaymentService from '../services/paymentService'
import { handleError } from "../utils/handleError";

require("dotenv").config();

interface PaymentSession {
  amount:number;
  userId:string;
  bookingId:string;
  vendorId:string;
}

declare module "express-session" {
  interface Session {
    payment: PaymentSession;
  }
}

class PaymentController {
  async makePayment(req: Request, res: Response) {
    const stripeSecretKey = process.env.STRIPE_KEY as string;
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    const userId = req.body.userId;
    const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items: [
            {
              price_data: {
                currency: 'bdt',
                product_data: {
                    name: req.body.name,
                    images:[req.body.logoUrl],     
                    metadata: {
                      vendorId: req.body._id,
                      userId:userId
                    },
                },
                unit_amount:1000*100,
              },
              quantity:1
            },
          ],
        mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?id=${req.body.bookingId}`,
      cancel_url: `${process.env.CLIENT_URL}/profile/booking-details`,
    });

    req.session.payment = {
      amount:1000,
      userId:req.body.userId,
      bookingId:req.body.bookingId,
      vendorId:req.body._id
    };

    console.log(req.session)
    res.send({ url: session.url });
  }


  async addPayment(req: Request, res: Response){
    try {
      console.log(req.session.payment)
      const paymentData = req.session.payment;
      const amount=paymentData.amount;
      const userId=paymentData.userId;
      const vendorId=paymentData.vendorId;
      const bookingId=paymentData.bookingId;
      const payment=await PaymentService.addNewPayment(amount,userId,vendorId,bookingId);
      res.status(201).json({payment})
    } catch (error) {
      handleError(res, error, "addPayment");
    }
  }

  async getAllPayments(req: Request, res: Response){
    try {
      const payment=await PaymentService.getPayments()
      res.status(200).json({payment})
    } catch (error) {
      handleError(res, error, "getAllPayments");
    }
  }
};


export default new PaymentController();


