// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from 'express';
// import asyncHandler from 'express-async-handler';
// import User, { UserDocument } from "../models/user";

// interface RequestWithUser extends Request {
//   user?: UserDocument;
// }

// const protectUser = asyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction) => {
//   let token: string | undefined;
//   token = req.cookies.jwtToken;

//   if (token) {
//     try {
//       const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//       req.user! = await User.findById(decoded.userId).select('-password');
//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error('Not authorized, Invalid token!');
//     }
//   } else {
//     res.status(401);
//     throw new Error('Not authorized, no token!');
//   }
// });


// // const isBlocked = asyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction)=>{
// //   const userData= await User.findOne(res.locals.user._id)
// //   if(userData.isActive===true){
// //     res.cookie('jwtToken', '', { maxAge: 1 })
// //     res.redirect("/")
// //   }else{
// //     next()
// //   }
// // })

// export {
//   protectUser,
//   // isBlocked
// };
