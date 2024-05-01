import express from 'express';
import messageController from '../controllers/messageController'
export const router = express.Router();

router.post('/', messageController.createMessage);
router.get('/', messageController.getMessages);
router.patch('/add-emoji',messageController.addEmoji)




export default router;