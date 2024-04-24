import { Request, Response } from "express";
import Message from "../models/messageModel";
import messageService from "../services/messageService";

class MessageController {
  async createMessage(req: Request, res: Response): Promise<any> {
    try {
      const { conversationId, senderId, text } = req.body;
      const response = await messageService.createMessage(
        conversationId,
        senderId,
        text
      );
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }

  async getMessages(req: Request, res: Response): Promise<any> {
    const conversationId: string = req.query.conversationId as string;
    try {
      const messages = await messageService.findMessages(conversationId);
      res.status(200).json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }

  async deleteAMessage(req: Request, res: Response): Promise<any> {
    try {
      const msgId = req.body.msgId;
      const messages = await messageService.updateStatus(msgId);
      res.status(200).json({ messages });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }

  async changeViewMessage(req: Request, res: Response): Promise<any> {
    try {
      const { msgId, id } = req.body;
      const messages = await messageService.changeMessageView(msgId,id);
      res.status(200).json({ messages });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
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
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
}

export default new MessageController();
