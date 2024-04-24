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
    } catch (error) {}
  }

  async findChat(userId:string) {
    try {
        return await conversationRepository.findByCondition({ members: { $in: [userId] } });
    } catch (error) {}
  }
}

export default new ConversationService();
