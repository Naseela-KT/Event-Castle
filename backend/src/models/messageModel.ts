import { Document,Schema,model } from "mongoose";

export interface messageDocument extends Document{
    conversationId:String;
    senderId:String;
    text:string;
    imageName:string;
    imageUrl:string;
    isRead:boolean;
    isDeleted:boolean;
    deletedIds:String[];
    emoji:String;
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
        type:String
    },
    imageName:{
        type:String
    },
    imageUrl:{
        type:String
    },
    isRead:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedIds:[{
        type:String
    }],
    emoji:{
        type:String
    }
},{timestamps:true})


export default model<messageDocument>('Message',messageSchema)