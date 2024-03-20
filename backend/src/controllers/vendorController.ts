import { Request , Response } from "express";
import { signup , login, CheckExistingVendor, getVendors, toggleVendorBlock, getSingleVendor, ResetVendorPasswordService } from "../services/vendorService";
import generateOtp from "../utils/generateOtp";
import vendor from "../models/vendor";



interface VendorSession {
  email: string;
      password: string;
      name: string;
      phone: number;
      city:string;
      vendor_type:string;
      otpCode?: string | undefined;
      otpSetTimestamp?: number | undefined;
}

interface OTP {
  otp: string | undefined;
  email:string;
  otpSetTimestamp: number | undefined;
}

declare module 'express-session' {
  interface Session {
    vendorData: VendorSession;
    otp:OTP | undefined,
  }
}

export const VendorController = {

  async vendorSignup(req: Request, res: Response): Promise<void> {
    try {
      const { email , password , name , phone , city,vendor_type } = req.body;

      const otpCode = await generateOtp(email);
      
      if (otpCode !== undefined) {
        req.session.vendorData = {
          email: email,
          password: password,
          name: name,
          phone: parseInt(phone),
          city:city,
          otpCode: otpCode,
          vendor_type:vendor_type,
          otpSetTimestamp: Date.now() 
      };

      console.log("vendor signup..Before")
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


  async ResendOtp(req:Request , res: Response):Promise<void>{
    try {
     const vendorData: VendorSession | undefined = req.session.vendorData;
     if (!vendorData) {
       res.status(400).json({ error: "Session data not found. Please sign up again." });
       return;
     }
     const email = vendorData.email;
     const newOtp = await generateOtp(email);
     if (req.session.vendorData) {
       req.session.vendorData.otpCode = newOtp;
     } else {
       console.error("Session user data is unexpectedly undefined.");
       res.status(500).json({ message: "Server Error: Session user data is unexpectedly undefined." });
       return;
     }
     res.status(200).json({ "message": "New OTP sent to email" });
    } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Server Error" });
    }
   },


   async PwdResendOtp(req:Request , res: Response):Promise<void>{
    try {
     const otp: OTP | undefined = req.session.otp;
     if (!otp) {
       res.status(400).json({ error: "Session data not found. Please sign up again." });
       return;
     }
     const email = otp.email;
     const newOtp = await generateOtp(email);
     if (req.session.otp) {
       req.session.otp.otp = newOtp;
     } else {
       console.error("Session user data is unexpectedly undefined.");
       res.status(500).json({ message: "Server Error: Session user data is unexpectedly undefined." });
       return;
     }
     res.status(200).json({ "message": "New OTP sent to email" });
    } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Server Error" });
    }
   },




      async VendorLogin(req:Request , res: Response): Promise <void> {
        try {
            const {email,password} = req.body;
            const { token, vendorData, message } = await login(email, password);
            res.cookie('jwtToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            res.status(200).json({token, vendorData, message });
        } catch (error) {
          if (error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message });
          } else {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
          }
            
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
          const vendor_type=vendorData.vendor_type
          const otpCode = vendorData.otpCode
          
          if(!vendorData.otpCode){
            throw new CustomError("OTP Expired...Try to resend OTP !!",400)
          }
          if(otp === otpCode){
           const vendor = await signup(email , password , name , phone , city,vendor_type);
          res.status(201).json(vendor);
          }else{
            throw new CustomError("Invalid otp !!",400);
          }

        } catch (error) {
          if (error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message });
          } else {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
          }
        }
      },

      async VendorForgotPassword(req:Request , res: Response):Promise<void>{

        try {
          const email = req.body.email;
          const vendor = await CheckExistingVendor(email);
          if(vendor){
            const otp = await generateOtp(email);
            (req.session as any).vendorotp = {otp:otp ,email:email};
            console.log(req.session)
            res.status(200).json({ "message":"otp sent to vendor email for password updation request " , "email":email });
          }else{
            res.status(400).json({error:'Email not Registered with us !!'})            
          }
          
        } catch (error) {
          if (error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message });
          } else {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
          }
        }
      },


      async VerifyOtpForPassword(req:Request , res: Response):Promise<void>{
        try {
          const ReceivedOtp = req.body.otp;
          console.log("received otp",ReceivedOtp);
          console.log(req.session)
          const generatedOtp = (req.session as any).vendorotp.otp;
          console.log("generated otp",generateOtp);
          
          if(ReceivedOtp === generatedOtp){
            console.log("otp is correct , navigating vendor to update password.");
            res.status(200).json({message:"otp is correct, please update password now"})
          }else{
            res.status(400).json({Error:`otp's didn't matched..`})
          }
        } catch (error) {
          if (error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message });
          } else {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
          }
        }
      },

      async getAllVendors(req: Request, res: Response): Promise<void>{
        try{
          const vendors = await getVendors();
          console.log(vendors)
          res.status(200).json(vendors);
        }catch(error){
          console.log(error);
          res.status(500).json({ message: "server error..." });
        }
      } ,

      async Toggleblock(req:Request , res: Response):Promise<void>{
        try {
          const VendorId: string | undefined = req.query.VendorId as string | undefined;
          if (!VendorId) {
              throw new Error('Vendor ID is missing or invalid.');
          } 
          
          await toggleVendorBlock(VendorId);
          let process=await vendor.findOne({_id:VendorId})
          res.status(200).json({ message: 'User block status toggled successfully.',process:!(process?.isActive)?"block":"unblock" });
      } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Server Error" });
      }
      },

      async getVendor(req:Request , res: Response):Promise<void>{
        try {
          const vendorId: string = req.query.Id as string; // or req.query.Id?.toString()
    
          if (!vendorId) {
            res.status(400).json({ error: "Vendor ID is required." });
            return;
          }

          const data = await getSingleVendor(vendorId);
          if(!data){
            res.status(400).json({error:'Vendor not found , error occured'})
          }else{
            res.status(200).json({data:data})
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Server Error" });
        }
      },

      async ResetVendorPassword(req:Request , res: Response):Promise<void>{
        
        try {
         const password = req.body.password;
         const confirmPassword = req.body.confirm_password;
             if(password === confirmPassword){
               const email=(req.session as any).vendorotp.email;;
               const status = await ResetVendorPasswordService(password , email); 
               res.status(200).json({ message: "Password reset successfully." });
             }else{
               res.status(400).json({ error: "Passwords do not match." });
             }
        } catch (error) {
         console.error(error);
         res.status(500).json({ message: "Server Error" });
        }
       },

     



}


export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}