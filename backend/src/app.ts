import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectToMongoDB';
import adminRoutes from "../src/routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import vendorRoutes from "./routes/vendorRoutes";
import cors from 'cors';
import session from 'express-session';
import { RequestHandler } from 'express';
import {userEmailVerifyOtp, userOtpExpiration,vendorOtpExpiration} from './middlewares/otpExpirationMiddleware'
import cookieParser = require('cookie-parser');
import messageRoutes from './routes/messageRoutes';
import chatRoute from './routes/conversationRoutes'
import path from 'path'
import { Request,Response,NextFunction } from 'express';

import initializeSocket from './socket';
import {createServer} from 'http';

const app=express()


dotenv.config();
connectDB();

const server = createServer(app)



app.use(cors({
  origin:["http://localhost:5000","https://eventcastle.online"],
  credentials:true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'../../frontend/dist')))

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
app.use('/api/messages',messageRoutes)
app.use('/api/conversation',chatRoute)

app.use((err:any, req:Request, res:Response, next:NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

initializeSocket(server);
app.get('*',(req:Request,res:Response) =>{
  res.sendFile(path.join(__dirname,'../../frontend/dist/index.html'))
})

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});
