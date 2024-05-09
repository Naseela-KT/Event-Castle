import { CustomError } from "../error/customError";
import conversationRepository from "../repositories/conversationRepository";

class ConversationService {
  async createConversation(senderId: string, receiverId: string) {
    try {
      let chat = await conversationRepository.findOne({
        members: [senderId, receiverId],
      });

      if (!chat) {
        const newChat = await conversationRepository.create({
          members: [senderId, receiverId],
        });
        return newChat;
      }
      return chat;
    } catch (error) {
      console.error("Error in createConversation:", error);
      throw new CustomError("Error creating conversation.", 500);
    }
  }

  async findChat(userId:string) {
    try {
        return await conversationRepository.findConversations(userId);
    } catch (error) {
      console.error("Error in findChat:", error);
    throw new CustomError("Error finding chats.", 500);
    }
  }

  async updateConversation(id:string,text:string){
    try {
      return await conversationRepository.findByIdAndUpdate(id,text)
    } catch (error) {
      throw error;
    }
  }
}

export default new ConversationService();
