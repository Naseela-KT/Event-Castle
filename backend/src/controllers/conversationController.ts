import { Request, Response } from "express";
import conversationService from "../services/conversationService";
import { handleError } from "../utils/handleError";


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
      handleError(res, error, "createChat"); 
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
      handleError(res, error, "findUserchats"); 
    }
  }
}


export default new ConversationController()



