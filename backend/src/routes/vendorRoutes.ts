import express from 'express';
import { VendorController } from '../controllers/vendorController';
import { VendorTypeController } from '../controllers/vendorTypeController';


const router = express.Router();


router.post('/signup' , VendorController.vendorSignup);
router.post('/verify' ,VendorController.verifyOtp)
router.get('/resendOtp' ,VendorController.ResendOtp);
router.get('/pwd-resendOtp' ,VendorController.PwdResendOtp);
router.post('/login' , VendorController.VendorLogin)
router.get('/logout' , VendorController.VendorLogout)
router.get('/vendor-types' , VendorTypeController.getVendorTypes);
router.post('/vendor-getotp' , VendorController.VendorForgotPassword)
router.post('/verifyVendorotp' , VendorController.VerifyOtpForPassword)
router.get('/getvendors' ,VendorController.getAllVendors )
router.post('/reset-password' , VendorController.ResetVendorPassword)


export default router;