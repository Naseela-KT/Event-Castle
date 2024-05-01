import { CustomError } from "../error/customError";
import messageModel from "../models/messageModel";
import messageRepository from "../repositories/messageRepository";

class MessageService {
  async createMessage(conversationId: string, senderId: string, text: string,imageName:string,imageUrl:string) {
    try {
      return await messageRepository.create({ conversationId, senderId, text,imageName,imageUrl});
    } catch (error) {
      console.error("Error in createMessage:", error);
      throw new CustomError("Failed to create message.", 500);
    }
  }

  async findMessages(conversationId: string) {
    try {
      return await messageRepository.findByCondition({ conversationId });
    } catch (error) {
      console.error("Error in findMessages:", error);
      throw new CustomError("Failed to retrieve messages.", 500);
    }
  }

  async updateStatus(msgId: string) {
    try {
      return await messageRepository.update(msgId, { isDeleted: true });
    } catch (error) {
      console.error("Error in updateStatus:", error);
      throw new CustomError("Failed to update message status.", 500);
    }
  }

  async changeMessageView(msgId: string, id: string) {
    try {
      return await messageModel.findByIdAndUpdate(msgId, {
        $push: { deletedIds: id },
      });
    } catch (error) {
      console.error("Error in changeMessageView:", error);
      throw new CustomError("Failed to change message view.", 500);
    }
  }
}

export default new MessageService();
