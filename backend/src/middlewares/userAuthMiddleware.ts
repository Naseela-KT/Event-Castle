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
import { NextFunction, Request, Response } from "express";
import User from "../models/user";

export const isBlocked = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne(req.body.userId); // Assuming userId is passed in the request body, adjust it as needed

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isActive) {
      // Clear JWT token if user is not active (blocked)
      res.cookie("jwtToken", "", { maxAge: 1 });
      return res.status(401).json({ message: "User is blocked" }); // Return 401 status to indicate blocked user
    }

    next(); // Move to the next middleware if user is active
  } catch (error) {
    console.error("Error in isBlocked middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { isBlocked };
