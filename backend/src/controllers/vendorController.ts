import { Request , Response } from "express";
import { signup , login } from "../services/vendorService";
import nodemailer from 'nodemailer';

export const VendorController = {

  async vendorSignup(req: Request, res: Response): Promise<void> {
    try {
      const { email , password , name , phone , city,vendor_type } = req.body;

      const otpCode: string = Math.floor(1000 + Math.random() * 9000).toString();
      
      

      const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
              user: process.env.USER_NAME,
              pass: process.env.USER_PASSWORD,
          },
      });

      const mailOptions = {
          from: process.env.USER_NAME,
          to: email,
          subject: "Verification Code",
          text: `Your OTP code is: ${otpCode}`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);

      (req.session as any).vendor = {
          email: email,
          password: password,
          name: name,
          phone: phone,
          city:city,
          otpCode: otpCode,
          vendor_type:vendor_type
      };

     
      
      res.status(200).json({ "message":"OTP send to email for verification.." , "email":email });
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
          const vendorData = (req.session as any).vendor; 
          console.log("session stored vendordata :", vendorData)
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