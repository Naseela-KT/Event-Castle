import express from 'express';
import { UserController } from '../controllers/userController';
import { VendorController } from '../controllers/vendorController';



const router = express.Router();


router.post('/signup', UserController.UserSignup );
router.post('/verify' ,UserController.verifyOtp);
router.post('/resendOtp' ,UserController.ResendOtp)
router.post('/login', UserController.UserLogin );
router.get('/logout' , UserController.UserLogout);
router.post('/getotp' , UserController.UserForgotPassword)
router.post('/verify-otp' , UserController.VerifyOtpForPassword)
router.post('/reset-password' , UserController.ResetUserPassword)
router.get('/getvendors' ,VendorController.getAllVendors )
router.post('/google/login',UserController.googleLogin)
router.post('/google/register',UserController.googleRegister)


export default router;