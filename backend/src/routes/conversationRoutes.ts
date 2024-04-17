import express from 'express';
export const router = express.Router();
import {createChat , findUserchats} from '../controllers/conversationController';



router.post('/', createChat);
router.get('/', findUserchats);


export default router;