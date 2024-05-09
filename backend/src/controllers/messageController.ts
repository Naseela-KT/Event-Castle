import { Request, Response } from "express";
import Message from "../models/messageModel";
import messageService from "../services/messageService";
import { handleError } from "../utils/handleError";
import conversationService from "../services/conversationService";

class MessageController {
  async createMessage(req: Request, res: Response): Promise<any> {
    try {
      const { conversationId, senderId, text,imageName,imageUrl} = req.body;
      const response = await messageService.createMessage(
        conversationId,
        senderId,
        text,
        imageName,
        imageUrl
      );
      await conversationService.updateConversation(conversationId,text);
      res.status(200).json(response);
    } catch (error) {
      handleError(res, error, "createMessage");
    }
  }

  async getMessages(req: Request, res: Response): Promise<any> {
    const conversationId: string = req.query.conversationId as string;
    try {
      const messages = await messageService.findMessages(conversationId);
      res.status(200).json(messages);
    } catch (error) {
      handleError(res, error, "getMessages");
    }
  }

  async deleteAMessage(req: Request, res: Response): Promise<any> {
    try {
      const msgId = req.body.msgId;
      const messages = await messageService.updateStatus(msgId);
      res.status(200).json({ messages });
    } catch (error) {
      handleError(res, error, "deleteAMessage");
    }
  }

  async changeViewMessage(req: Request, res: Response): Promise<any> {
    try {
      const { msgId, id } = req.body;
      const messages = await messageService.changeMessageView(msgId,id);
      res.status(200).json({ messages });
    } catch (error) {
      handleError(res, error, "changeViewMessage");
    }
  }

  async addEmoji(req: Request, res: Response): Promise<any> {
    try {
      const { msgId, emoji } = req.body;
      const messages = await Message.findByIdAndUpdate(msgId, {
        $set: { emoji: emoji },
      });
      res.status(200).json({ messages });
    } catch (error) {
      handleError(res, error, "addEmoji");
    }
  }

  async changeRead(req: Request, res: Response): Promise<any> {
    try {
      const { chatId, senderId } = req.body;
      const messages = await messageService.changeReadStatus(chatId,senderId)
      res.status(200).json({ messages });
    } catch (error) {
      handleError(res, error, "changeRead");
    }
  }


  
}

export default new MessageController();
