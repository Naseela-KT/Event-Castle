import express from "express";
import  AdminController  from "../controllers/adminController";
import { UserController } from "../controllers/userController";
import { VendorTypeController } from "../controllers/vendorTypeController";
import { VendorController } from "../controllers/vendorController";
import { PaymentController } from "../controllers/paymentController";
import adminAuth from "../middlewares/adminAuthMiddleware";
import { NotificationController } from "../controllers/notificationController";

const router = express.Router();


//Auth
router.post('/login' , AdminController.Adminlogin);
router.get('/logout' ,AdminController.Adminlogout);
router.post('/refresh-token' , AdminController.createRefreshToken)

//user
router.get('/users' ,adminAuth, UserController.allUsers);
router.patch('/block-unblock' , UserController.Toggleblock)


//Vendor
router.patch('/vendorblock-unblock', VendorController.Toggleblock)
router.get('/getvendor',adminAuth, VendorController.getVendor)
router.get('/getvendors' ,adminAuth,VendorController.getAllVendors )
router.put('/update-verify-status',VendorController.updateVerifyStatus);

//vendorType
router.post('/add-type' , VendorTypeController.addVendorType);
router.get('/vendor-types' ,adminAuth,VendorTypeController.getVendorTypes);
router.delete('/delete-vendortype',VendorTypeController.deleteVendorType)
router.get("/single-type",adminAuth,VendorTypeController.LoadSingleType)
router.put("/update-type",VendorTypeController.updateType)

//Payment
router.get('/load-admin-data',AdminController.getAdminData)
router.get('/all-payment-details',adminAuth,PaymentController.getAllPayments);
router.get('/all-payment-details',PaymentController.getAllPayments);

//Notification
router.get('/admin-notifications',NotificationController.getAdminNotifications);
router.patch('/toggle-read',NotificationController.toggleRead)

export default router;



