import Message, { messageDocument } from "../models/messageModel";
import { BaseRepository } from "./baseRepository";

class MessageRepository extends BaseRepository<messageDocument>{
    constructor(){
        super(Message)
    }
}

export default new MessageRepository()