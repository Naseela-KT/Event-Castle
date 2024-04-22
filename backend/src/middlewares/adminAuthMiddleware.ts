import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


interface AuthenticatedRequest extends Request {
  Admin?: any;
}

export default function adminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  
  const token = req.headers.authorization;
 
  
  if (!token) {
    console.log("error from middleware , Token not provided");
    return res.status(401).json({ message: 'Token not provided' });
  }

  const accessToken = token.split(' ')[1];

  jwt.verify(accessToken, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) {
      console.log("error from middleware , Invalid token");
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    req.Admin = decoded;
    next();
  });
}