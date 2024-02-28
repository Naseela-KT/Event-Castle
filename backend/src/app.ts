import express from  'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.config';
import adminRoutes from "../src/routes/adminRoutes"
import userRoutes from "./routes/userRoutes"


dotenv.config();

connectDB();

const app = express();

app.use(bodyParser.json());

app.use('/api/admin' , adminRoutes);
app.use('/api/user' , userRoutes);


const PORT = process.env.PORT;
app.listen(PORT , ()=>{
    console.log(`Server running on ${PORT}...`);
    
});
