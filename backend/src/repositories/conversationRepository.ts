import Conversation, { conversationDocument } from "../models/conversationModel";
import { BaseRepository } from "./baseRepository";

class ConversationRepository extends BaseRepository<conversationDocument>{
    constructor(){
        super(Conversation)
    }

    findByIdAndUpdate(id:string,text:string){
       return Conversation.findOneAndUpdate({_id:id},{$set:{recentMessage:text}})
    }

    findConversations(userId:string){
        return Conversation.find({ members: { $in: [userId] } }).sort({updatedAt:-1})
    }
}


export default new ConversationRepository();