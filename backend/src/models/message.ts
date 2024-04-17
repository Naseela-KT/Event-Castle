import { Document,Schema,model } from "mongoose";

export interface messageDocument extends Document{
    conversationId:String;
    senderId:String;
    text:string;
}

const messageSchema=new Schema<messageDocument>({
    conversationId:{
        type:String,
        required:true
    },
    senderId:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    }
},{timestamps:true})


export default model<messageDocument>('Message',messageSchema)