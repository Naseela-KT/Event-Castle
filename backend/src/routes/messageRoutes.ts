import express from "express";
import { messageController } from "../controllers/messageController";
import protectUser from "../middlewares/protectUserRoute";
import { conversationController } from "../controllers/conversationController";
const router=express()


router.get('/get-messages',messageController.getMessages)
router.post('/send/:id',messageController.sendMessage)
router.get('/get-user-conversations',conversationController.getUserConversations)


export default router