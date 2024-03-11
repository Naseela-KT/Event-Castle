import express from 'express';
import { VendorController } from '../controllers/vendorController';
import { VendorTypeController } from '../controllers/vendorTypeController';


const router = express.Router();


router.post('/signup' , VendorController.vendorSignup);
router.post('/verify' ,VendorController.verifyOtp)
router.post('/login' , VendorController.VendorLogin)
router.get('/logout' , VendorController.VendorLogout)
router.get('/vendor-types' , VendorTypeController.getVendorTypes);
router.post('/vgetotp' , VendorController.VendorForgotPassword)
router.post('/verifyVendorotp' , VendorController.VerifyOtpForPassword)

export default router;