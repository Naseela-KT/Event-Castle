import messageModel from "../models/messageModel"
import messageRepository from "../repositories/messageRepository"

class MessageService{
    async createMessage(conversationId:string,senderId:string,text:string){
        try {
            return await messageRepository.create({conversationId,senderId,text})
        } catch (error) {
            
        }
    }

    async findMessages(conversationId:string){
        try {
            return await messageRepository.findByCondition({conversationId})
        } catch (error) {
            
        }
    }

    async updateStatus(msgId:string){
        try {
            return await messageRepository.update(msgId, { isDeleted: true })
        } catch (error) {
            
        }
    }

    async changeMessageView(msgId:string,id:string){
        try {
            return await messageModel.findByIdAndUpdate(msgId, {
                $push: { deletedIds: id },
              }
        )
        } catch (error) {
            
        }
    }
}

export default new MessageService()