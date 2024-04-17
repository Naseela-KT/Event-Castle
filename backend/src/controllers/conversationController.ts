import Conversation from '../models/conversation'
import { Request, Response } from "express";

//create chat 
//getuserchats
//findchat




export const createChat = async (req: Request, res: Response): Promise<void> => {

    const {senderId , receiverId} = req.body;
   
  try {
    let chat = await Conversation.findOne({ members: [senderId, receiverId] });

    if (!chat) {
      const newChat = new Conversation({ members: [senderId, receiverId] });
      chat = await newChat.save();
    }

    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const findUserchats = async (req: Request, res: Response):Promise<any> => {
    let userId  = req.query.userId;
    try {
        const chats  = await Conversation.find({members:{$in :[userId]}})
        
        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};






