import express from 'express';
import { VendorController } from '../controllers/vendorController';


const router = express.Router();


router.post('/signup' , VendorController.vendorSignup);
router.post('/login' , VendorController.VendorLogin)
router.get('/logout' , VendorController.VendorLogout)



export default router;