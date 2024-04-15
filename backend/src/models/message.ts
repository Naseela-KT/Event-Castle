import { Document,Schema,model } from "mongoose";

export interface messageDocument extends Document{
    senderId:Schema.Types.ObjectId;
    receiverId:Schema.Types.ObjectId;
    message:string;
}

const messageSchema=new Schema<messageDocument>({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})


export default model<messageDocument>('Message',messageSchema)