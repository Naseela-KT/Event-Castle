import express from 'express';
export const router = express.Router();
import conversationController from '../controllers/conversationController';



router.post('/', conversationController.createChat);
router.get('/', conversationController.findUserchats);


export default router;