import { Request , Response } from "express";
import { signup , login, getUsers,toggleUserBlock } from "../services/userService";
import nodemailer from 'nodemailer';

interface UserSession {
  email: string;
  password: string;
  name: string;
  phone: number;
  otpCode: string;
}

declare module 'express-session' {
  interface Session {
    user: UserSession;
  }
}


export const  UserController = {



async UserSignup(req: Request, res: Response): Promise<void> {
  try {
    const { email , password , name , phone } = req.body;
    console.log(req.body)

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

    req.session.user = {
        email: email,
        password: password,
        name: name,
        phone: parseInt(phone),
        otpCode: otpCode
    };
    
    console.log("signup..")
    console.log(req.session)
    res.status(200).json({ "message":"OTP send to email for verification.." , "email":email });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
},


async verifyOtp(req:Request , res: Response):Promise<void>{
  try {
    console.log("user "+req.session.user)
    const otp = req.body.otp;
    console.log("otp.............."+otp)
    console.log(req.session)
    const userData = req.session.user; 
          console.log("session stored userdata :", userData)
          const email = userData.email;
          const password = userData.password;
          const name = userData.name;
          const phone = userData.phone;
          const otpCode = userData.otpCode;
          console.log("session.............")
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







      async UserLogin(req:Request , res: Response): Promise <void>{
        try {
            const {email,password} = req.body;
            const { token, userData, message } = await login(email, password);
            res.cookie('jwtToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            res.status(200).json({token, userData, message });
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Server Error"})
            
        }
      } ,
    
     
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
      }
};