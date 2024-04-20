import express from 'express';
import {addEmoji, createMessage , getMessages} from '../controllers/messageController'
export const router = express.Router();

router.post('/', createMessage);
router.get('/', getMessages);
router.patch('/add-emoji',addEmoji)


export default router;