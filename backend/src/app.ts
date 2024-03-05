import express from  'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.config';
import adminRoutes from "../src/routes/adminRoutes"
import userRoutes from "./routes/userRoutes"
import vendorRoutes from "./routes/vendorRoutes"
import cors from 'cors';
import session from 'express-session';
import cookieParser from "cookie-parser"
import { notFound,errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

connectDB();

const app = express();


app.use(bodyParser.json());
app.use(cors());


app.use(
    session({
      secret: process.env.SESSION_SECRET!, 
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
    })
  );
  app.use(cookieParser());

app.use('/api/admin' , adminRoutes);
app.use('/api/user' , userRoutes);
app.use('/api/vendor',vendorRoutes)

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT;
app.listen(PORT , ()=>{
    console.log(`Server running on ${PORT}...`);
    
});
