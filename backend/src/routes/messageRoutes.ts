import express from 'express';
import {createMessage , getMessages} from '../controllers/messageController'
export const router = express.Router();

router.post('/', createMessage);
router.get('/', getMessages);


export default router;