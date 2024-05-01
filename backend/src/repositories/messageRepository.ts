import Message, { messageDocument } from "../models/messageModel";
import { BaseRepository } from "./baseRepository";

class MessageRepository extends BaseRepository<messageDocument>{
    constructor(){
        super(Message)
    }

    async updateReadStatus(chatId:string,senderId:string){
        return Message.updateMany({conversationId:chatId,senderId:senderId},{$set:{isRead:true}})
    }
}

export default new MessageRepository()