import express from 'express';
import { VendorController } from '../controllers/vendorController';
import { VendorTypeController } from '../controllers/vendorTypeController';
import { protectVendor } from '../middlewares/vendorAuthMiddleware';

const router = express.Router();


router.post('/signup' , VendorController.vendorSignup);
router.post('/verifyotp' ,VendorController.verifyOtp)
router.post('/login' , VendorController.VendorLogin)
router.get('/logout' , VendorController.VendorLogout)
router.get('/vendor-types' , VendorTypeController.getVendorTypes);


export default router;