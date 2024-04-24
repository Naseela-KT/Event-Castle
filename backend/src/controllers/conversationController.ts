import Conversation from "../models/conversationModel";
import { Request, Response } from "express";
import conversationService from "../services/conversationService";


class ConversationController{
  async createChat(
    req: Request,
    res: Response
  ): Promise<void>{
    try {
      const { senderId, receiverId } = req.body;
      const chat=await conversationService.createConversation(senderId,receiverId)
      res.status(200).json(chat);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }

  async findUserchats(
    req: Request,
    res: Response
  ): Promise<any>{
    
    try {
      let userId:string= req.query.userId as string;
      const chats = await conversationService.findChat(userId);
      res.status(200).json(chats);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
}


export default new ConversationController()



