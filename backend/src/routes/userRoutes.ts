import express from 'express';
import { UserController } from '../controllers/userController';
import { VendorController } from '../controllers/vendorController';
import multer from 'multer';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router();



router.post('/signup', UserController.UserSignup );
router.post('/verify' ,UserController.verifyOtp);
router.get('/resendOtp' ,UserController.ResendOtp);
router.get('/pwd-resendOtp' ,UserController.PwdResendOtp);
router.post('/login', UserController.UserLogin );
router.get('/logout' , UserController.UserLogout);
router.post('/getotp' , UserController.UserForgotPassword)
router.post('/verify-otp' , UserController.VerifyOtpForPassword)
router.post('/reset-password' , UserController.ResetUserPassword)
router.get('/getvendors' ,VendorController.getAllVendors )
router.post('/google/login',UserController.googleLogin)
router.post('/google/register',UserController.googleRegister)

router.post('/update-password' , UserController.updatePasswordController)
router.put('/update-profile',upload.single('image'),UserController.updateProfile)


export default router;