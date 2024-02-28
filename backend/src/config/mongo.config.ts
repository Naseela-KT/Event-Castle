import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGODB_URI);
    }catch(error){

    }
}
