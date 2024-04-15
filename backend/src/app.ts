import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectToMongoDB';
import adminRoutes from "../src/routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import vendorRoutes from "./routes/vendorRoutes";
import cors from 'cors';
import session from 'express-session';
import { RequestHandler } from 'express';
import {userEmailVerifyOtp, userOtpExpiration,vendorOtpExpiration} from './middlewares/otpExpiration'
import cookieParser = require('cookie-parser');
import messageRoutes from './routes/messageRoutes';
import {app,server} from './socket/socket'


dotenv.config();
connectDB();




app.use(cors({
  origin:"http://localhost:5000",
  credentials:true
}));

const sessionMiddleware: RequestHandler = session({
  secret: 'cfcyygyv',
  saveUninitialized: true,
  resave:false,
  cookie:{
    secure:false,
    httpOnly:true,
    maxAge:24*60*60*1000,
    sameSite:"lax"
  }
});






app.use(sessionMiddleware)


app.use(express.json());
app.use(cookieParser())
app.use(userOtpExpiration)
app.use(vendorOtpExpiration)
app.use(userEmailVerifyOtp)

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/message',messageRoutes)

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});
