import { Request, Response } from "express";
const Stripe = require("stripe");

require("dotenv").config();

export const PaymentController = {
  async makePayment(req: Request, res: Response) {
    const stripeSecretKey = process.env.STRIPE_KEY as string;
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    const userId = req.body.userId;
    const vendorId=req.body.vendorId
    const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items: [
            {
              price_data: {
                currency: 'bdt',
                product_data: {
                    name: "DreamDay",       
                    metadata: {
                      vendorId: vendorId,
                    },
                },
                unit_amount:100,
              },
              quantity:1
            },
          ],
        mode: "payment",
        
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/profile/booking-details`,
    });

    res.send({ url: session.url });
  },
};
