import { Request, Response } from "express";
import Message from '../models/messageModel'





export const createMessage = async (req: Request, res: Response):Promise<any> =>{

    const {conversationId , senderId , text } = req.body;

    const message = new Message({
        conversationId,
        senderId,
        text
    })

    try {
        const response = await message.save();
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" });
    }
}



export const getMessages = async (req: Request, res: Response):Promise<any> =>{
    const conversationId = req.query.conversationId;
    try {
        const messages = await Message.find({conversationId: conversationId});
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
        
    }
}


export const deleteAMessage=async(req: Request, res: Response):Promise<any> =>{
    const msgId = req.body.msgId;
    console.log(msgId)
    try {
        const messages = await Message.findByIdAndUpdate(msgId,{$set:{isDeleted:true}});
        res.status(200).json({messages});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
        
    }
}

export const changeViewMessage=async(req: Request, res: Response):Promise<any> =>{
    const msgId = req.body.msgId;
    const id=req.body.id
    console.log(msgId,)
    try {
        const messages = await Message.findByIdAndUpdate(msgId,{$push:{deletedIds:id}});
        res.status(200).json({messages});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
        
    }
}

export const addEmoji=async(req: Request, res: Response):Promise<any> =>{
    try {
        const {msgId,emoji}=req.body;
        const messages = await Message.findByIdAndUpdate(msgId,{$set:{emoji:emoji}});
        res.status(200).json({messages});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
   
}
