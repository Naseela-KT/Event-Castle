import express from 'express';
import { UserController } from '../controllers/userController';


const router = express.Router();


router.post('/signup', UserController.UserSignup );
router.post('/verify' ,UserController.verifyOtp);
router.post('/resendOtp' ,UserController.ResendOtp)
router.post('/login', UserController.UserLogin );
router.get('/logout' , UserController.UserLogout);
router.post('/getotp' , UserController.UserForgotPassword)
router.post('/verify-otp' , UserController.VerifyOtpForPassword)
router.post('/resetpassword' , UserController.ResetUserPassword)



export default router;