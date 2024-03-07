// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from 'express';
// import asyncHandler from 'express-async-handler';
// import Vendor, {VendorDocument } from "../models/vendor";

// interface RequestWithVendor extends Request {
//   user?: VendorDocument;
// }

// const protectVendor = asyncHandler(async (req: RequestWithVendor, res: Response, next: NextFunction) => {
//   let token: string | undefined;
//   token = req.cookies.jwtToken;

//   if (token) {
//     try {
//       const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//       req.user! = await Vendor.findById(decoded.vendorId).select('-password');
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
//   protectVendor
// };
