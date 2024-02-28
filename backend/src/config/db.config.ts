import mongoose from 'mongoose';

const connectDB=async()=>{
    try{
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
          }
        const connect=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected:${connect.connection.host}`);
    }catch(error){
        console.error(`Error:${error}`)
        process.exit(1)
    }
}

export default connectDB;