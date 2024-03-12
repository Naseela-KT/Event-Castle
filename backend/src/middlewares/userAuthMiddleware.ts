// import { NextFunction, Request, Response } from "express"
// import User from "../models/user"

// export const isBlocked = async(req:Request,res:Response,next:NextFunction)=>{
 
//     const user= await User.findOne(res.locals.user)
//     console.log(user)
//     if(user?.isActive==false){
//       await res.cookie('jwtToken', '', { maxAge: 1 })
//     }else{
//       next()
//     }
//   }
  
//   module.exports = {isBlocked};