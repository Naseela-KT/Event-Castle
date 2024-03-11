import { Request , Response } from "express";
import { signup , login } from "../services/vendorService";
import nodemailer from 'nodemailer';
import generateOtp from "../utils/generateOtp";

export const VendorController = {

  async vendorSignup(req: Request, res: Response): Promise<void> {
    try {
      const { email , password , name , phone , city,vendor_type } = req.body;

      const otpCode = await generateOtp(email);
      
      if (otpCode !== undefined) {
        (req.session as any).vendorData = {
          email: email,
          password: password,
          name: name,
          phone: parseInt(phone),
          city:city,
          otpCode: otpCode,
          vendor_type:vendor_type
        
      };

      console.log("vendor signup..")
      console.log(req.session)
      res.status(200).json({ "message":"OTP send to vendor's email for verification.." , "email":email });   

      }else{

        console.log("couldn't generate otp, error occcured ,please fix !!");
        res.status(500).json({ message: `Server Error couldn't generate otp, error occcured ,please fix !!` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },





      async VendorLogin(req:Request , res: Response): Promise <void> {
        try {
            const {email,password} = req.body;
            const { token, vendorData, message } = await login(email, password);
            res.cookie('jwtToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            res.status(200).json({token, vendorData, message });
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Server Error"})
            
        }
      } ,
    

      async VendorLogout(req:Request , res: Response): Promise <void> {
        try {
          res.clearCookie('jwtToken');
          res.status(200).json({ message: 'vendor logged out successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Server Error"})
            
        }
      },

      async verifyOtp(req:Request , res: Response):Promise<void>{
        try {
          const otp = req.body.otp;
          const vendorData = (req.session as any).vendorData; 
          const email = vendorData.email;
          const password = vendorData.password;
          const name = vendorData.name;
          const phone = vendorData.phone;
          const city = vendorData.city;
          const otpCode = vendorData.otpCode
          const vendor_type=vendorData.vendor_type
          if(otp === otpCode){
           const vendor = await signup(email , password , name , phone , city,vendor_type);
          res.status(201).json(vendor);
          }else{
            res.status(400).json({ error:"Invalid otp !!"});
          }

        } catch (error) {
          console.log(error);
          res.status(500).json({message:"Server Error"})
        }
      }



}