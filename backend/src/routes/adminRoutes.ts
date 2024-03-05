import express from "express";
import { AdminController } from "../controllers/adminController";
import { UserController } from "../controllers/userController";
import { VendorTypeController } from "../controllers/vendorTypeController";
const router = express.Router();


router.post('/login' , AdminController.Adminlogin);
router.get('/logout' , AdminController.Adminlogout);
router.get('/users' , UserController.allUsers);
router.post('/add-type' , VendorTypeController.addVendorType);
router.get('/vendor-types' , VendorTypeController.getVendorTypes);

export default router;


