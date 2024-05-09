import { Document,Schema,model } from "mongoose";

export interface conversationDocument extends Document{
    members:String[];
    recentMessage: String;
    // messages:Array<Schema.Types.ObjectId>;
}


const conversationSchema=new Schema({
    members:[{
        type:String,
        
    }],
    recentMessage: String
},{timestamps:true})


export default model<conversationDocument>("Conversation",conversationSchema)