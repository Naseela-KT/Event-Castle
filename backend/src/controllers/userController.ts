import { Request , Response } from "express";
import { signup , login, getUsers,toggleUserBlock, CheckExistingUSer, generateOtpForPassword, ResetPassword } from "../services/userService";
import nodemailer from 'nodemailer';
import generateOtp from "../utils/generateOtp";

interface UserSession {
  email: string;
  password: string;
  name: string;
  phone: number;
  otpCode: string | undefined;
}

interface OTP {
  otp: string;
  email:string
}



declare module 'express-session' {
  interface Session {
    user: UserSession;
    otp:OTP,
  }
}


export const  UserController = {



  async UserSignup(req: Request, res: Response): Promise<void> {
    try {
  
      const { email , password , name , phone } = req.body;
     
      const otpCode = await generateOtp(email);
   
      if (otpCode !== undefined) {
        req.session.user = {
          email: email,
          password: password,
          name: name,
          phone: parseInt(phone),
          otpCode: otpCode
        }

        setTimeout(()=>{
        req.session.user.otpCode = undefined
        } ,60000)
      
        console.log("signup..")
        console.log(req.session)
        res.status(200).json({ "message":"OTP send to email for verification.." , "email":email });   
      
      }
        else{
           console.log("couldn't generate otp, error occcured ,please fix !!");
           res.status(500).json({ message: `Server Error couldn't generate otp, error occcured ,please fix !!` });
        }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },
  
  async verifyOtp(req:Request , res: Response):Promise<void>{
    try {
      const otp = req.body.otp;
      const userData = req.session.user;
      const email = userData.email;
      const password = userData.password;
      const name = userData.name;
      const phone = userData.phone;
      const otpCode = userData.otpCode;
      if(otp === otpCode){
      const user = await signup(email , password , name , phone );
      res.status(201).json(user);
      }else{
        res.status(400).json({ error:"Invalid otp !!"});
      }
  
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Server Error"})
    }},  
  




      async UserLogin(req: Request, res: Response): Promise<void> {
        try {
          const { email, password } = req.body;
          const { token, userData, message } = await login(email, password);
          res.cookie('jwtToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
          res.status(200).json({ token, userData, message });
        } catch (error) {
          if (error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message });
          } else {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
          }
        }
      },
      
    
     
      async UserLogout(req:Request , res: Response): Promise <void> {
        try {
          res.clearCookie('jwtToken');
          res.status(200).json({ message: 'User logged out successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Server Error"})
            
        }
      },

      async allUsers(req: Request, res: Response): Promise<void>{
        try{
          const users = await getUsers();
          res.status(200).json(users);
        }catch(error){
          console.log(error);
          res.status(500).json({ message: "server error..." });
        }
      } ,

      async Toggleblock(req:Request , res: Response):Promise<void>{
        try {
          const userId: string | undefined = req.query.userId as string | undefined;
          if (!userId) {
              throw new Error('User ID is missing or invalid.');
          } 
          
          await toggleUserBlock(userId);
          res.status(200).json({ message: "User block status toggled successfully." });
      } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Server Error" });
      }
      },

      async UserForgotPassword(req:Request , res: Response):Promise<void>{
        try {
          const email = req.body.email;
          console.log(email)
          const user = await CheckExistingUSer(email);
          if(user){
            const otp = await generateOtpForPassword(email);
            req.session.otp = { otp: otp  , email:email};
            console.log(req.session.otp)
            res.status(200).json({ message:"OTP sent to email for password updation request " , email });
          }else{
            res.status(400).json({error:'User not found !!'})            
          }
          
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Server Error" });
        }
      },


      async VerifyOtpForPassword(req:Request , res: Response):Promise<void>{
        try {
          const ReceivedOtp = req.body.otp;
          console.log("received otp",ReceivedOtp);
          const generatedOtp = req.session.otp.otp;
          console.log("generated otp",generateOtp);
          
          if(ReceivedOtp === generatedOtp){
            console.log("otp is correct , navigating user to update password.");
            res.status(200).json({data:"otp is correct"})
          }else{
            res.status(400).json({Error:`otp's didn't matched..`})
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Server Error" });
        }
      } , 


      async ResetUserPassword(req:Request , res: Response):Promise<void>{
        
       try {
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
            if(password === confirmPassword){
              const email=req.session.otp.email;
              const status = await ResetPassword(password , email); 
              res.status(200).json({ message: "Password reset successfully." });
            }else{
              res.status(400).json({ error: "Passwords do not match." });
            }
       } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
       }
      }
};

// Define a custom error class
export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}