import { Request, Response } from "express";
import Conversation, { conversationDocument } from "../models/conversation";
import vendor from "../models/vendor";


export const conversationController = {
  async getUserConversations(req: Request, res: Response): Promise<void> {
    try {
        
        const userId = req.query.userId;

      
        const userConversations = await Conversation.find({
            participants: userId
        })
      
        const otherParticipantIds: string[] = [];
        userConversations.forEach((conversation: conversationDocument) => {
            conversation.participants.forEach((participant: any) => {
                if (participant._id != userId) {
                    otherParticipantIds.push(participant._id);
                }
            });
        });

        const vendors = await vendor.find({ _id: { $in: otherParticipantIds } });
        console.log(userConversations)
        res.status(200).json(vendors);
    } catch (error) {
        console.log("Error in getUserConversations Controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
  },


 
}