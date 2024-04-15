import { Document,Schema,model } from "mongoose";

export interface conversationDocument extends Document{
    participants:Array<Schema.Types.ObjectId>;
    messages:Array<Schema.Types.ObjectId>;
}


const conversationSchema=new Schema({
    participants:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    messages:[{
        type:Schema.Types.ObjectId,
        ref:"Message",
        default:[]
    }],
},{timestamps:true})


export default model<conversationDocument>("Conversation",conversationSchema)