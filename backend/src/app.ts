import express from  'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.config';

// Load environment variables from .env file
dotenv.config();

connectDB();

const app = express();

app.use(bodyParser.json());


const PORT = process.env.PORT;
app.listen(PORT , ()=>{
    console.log(`Server running on ${PORT}...`);
    
});
