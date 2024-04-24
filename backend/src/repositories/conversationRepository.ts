import Conversation, { conversationDocument } from "../models/conversationModel";
import { BaseRepository } from "./baseRepository";

class ConversationRepository extends BaseRepository<conversationDocument>{
    constructor(){
        super(Conversation)
    }
}


export default new ConversationRepository();