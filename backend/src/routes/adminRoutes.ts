import express from "express";
import { AdminController } from "../controllers/adminController";
import { UserController } from "../controllers/userController";
import { VendorTypeController } from "../controllers/vendorTypeController";
import { VendorController } from "../controllers/vendorController";
const router = express.Router();


router.post('/login' , AdminController.Adminlogin);
router.get('/logout' , AdminController.Adminlogout);

//user
router.get('/users' , UserController.allUsers);
router.patch('/block-unblock' , UserController.Toggleblock)

//Vendor
router.patch('/vendorblock-unblock' , VendorController.Toggleblock)
router.get('/getvendor', VendorController.getVendor)
router.get('/getvendors' ,VendorController.getAllVendors )

//vendorType
router.post('/add-type' , VendorTypeController.addVendorType);
router.get('/vendor-types' ,VendorTypeController.getVendorTypes);
router.delete('/delete-vendortype',VendorTypeController.deleteVendorType)
router.get("/single-type",VendorTypeController.LoadSingleType)
router.put("/update-type",VendorTypeController.updateType)

export default router;



