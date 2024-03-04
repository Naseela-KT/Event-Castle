import express from 'express';
import { UserController } from '../controllers/userController';


const router = express.Router();


router.post('/signup', UserController.UserSignup );
router.post('/login', UserController.UserLogin );
router.get('/logout' , UserController.UserLogout)




export default router;