import { Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();

const generateUserTokenAndSetCookie=async(userId:string,res:Response)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET!,{expiresIn:'15d'})

    res.cookie("jwtUser",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure: process.env.NODE_ENV === "production"
    })
}

export default generateUserTokenAndSetCookie;