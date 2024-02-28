import express from  'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.config';
import adminRoute from "../src/routes/adminRoutes"
dotenv.config();

connectDB();

const app = express();

app.use(bodyParser.json());

app.use('/api/admin' , adminRoute);

const PORT = process.env.PORT;
app.listen(PORT , ()=>{
    console.log(`Server running on ${PORT}...`);
    
});
