import { Request, Response } from "express";
import Conversation from "../models/conversation";
import Message from "../models/message";
import { getReceiverSocketId, io } from "../socket/socket";

export const messageController = {
  async sendMessage(req: Request, res: Response): Promise<void> {
    try {
      const {message,senderId}=req.body
      const {id:receiverId}=req.params

      
      let conversation=await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
      })

      if(!conversation){
        conversation=await Conversation.create({
          participants:[senderId,receiverId]
        })
      }

      const newMessage=new Message({
        senderId,
        receiverId,
        message
      })

      if(newMessage){
        conversation.messages.push(newMessage._id)
      }
      await Promise.all([conversation.save(),newMessage.save()])

      const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

      res.status(201).json(newMessage)

    } catch (error) {
     console.log("Error in sendMessage Controller",error);
     res.status(500).json({error:"Internal server error"})
    }
  },


  async getMessages(req: Request, res: Response): Promise<void> {
    try {
      const {receiverId:userToChatId}=req.query;
      const senderId=req.query.userId

      const conversation=await Conversation.findOne({
        participants:{$all:[senderId,userToChatId]},
      }).populate("messages")

      if(!conversation){ 
        res.status(200).json([])
      }

      res.status(200).json(conversation?.messages)

    } catch (error) {
      console.log("Error in getMessages Controller",error);
      res.status(500).json({error:"Internal server error"})
    }
  }
}