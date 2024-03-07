// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from 'express';
// import asyncHandler from 'express-async-handler';
// import Admin, { AdminDocument } from "../models/admin";

// interface RequestWithAdmin extends Request {
//   admin?: AdminDocument;
// }

// const protectAdmin = asyncHandler(async (req: RequestWithAdmin, res: Response, next: NextFunction) => {
//   let token: string | undefined;
//   token = req.cookies.jwtToken;

//   if (token) {
//     try {
//       const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//       req.admin! = await Admin.findById(decoded.adminId).select('-password');
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

// export {
//   protectAdmin
// };
