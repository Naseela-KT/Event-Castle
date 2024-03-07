import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.config';
import adminRoutes from "../src/routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import vendorRoutes from "./routes/vendorRoutes";
import cors from 'cors';
import session from 'express-session';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin:"http://localhost:5000",
  credentials:true
}));


app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite:'lax'
    }
  })
);

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/vendor', vendorRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});
