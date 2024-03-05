import express from 'express';
import { UserController } from '../controllers/userController';
import { protectUser } from '../middlewares/userAuthMiddleware';

const router = express.Router();


router.post('/signup', UserController.UserSignup );
router.post('/verifyOtp' ,UserController.verifyOtp);
router.post('/login', UserController.UserLogin );
router.get('/logout' , UserController.UserLogout);




export default router;