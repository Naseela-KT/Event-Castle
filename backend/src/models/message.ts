import { Document,Schema,model } from "mongoose";

export interface messageDocument extends Document{
    conversationId:String;
    senderId:String;
    text:string;
    isDeleted:boolean;
    deletedIds:String[]
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
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedIds:[{
        type:String
    }]
},{timestamps:true})


export default model<messageDocument>('Message',messageSchema)