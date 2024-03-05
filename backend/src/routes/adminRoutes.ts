import express from "express";
import { AdminController } from "../controllers/adminController";
import { UserController } from "../controllers/userController";
import { VendorTypeController } from "../controllers/vendorTypeController";
import { protectAdmin } from "../middlewares/adminAuthMiddleware";
const router = express.Router();


router.post('/login' , AdminController.Adminlogin);
router.get('/logout' , AdminController.Adminlogout);
router.get('/users' ,protectAdmin, UserController.allUsers);
router.post('/add-type' ,protectAdmin, VendorTypeController.addVendorType);
router.get('/vendor-types' , protectAdmin,VendorTypeController.getVendorTypes);
router.patch('/block-unblock' , UserController.Toggleblock)

export default router;


