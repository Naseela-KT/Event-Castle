import express from "express";
import { AdminController } from "../controllers/adminController";
import { UserController } from "../controllers/userController";
import { VendorTypeController } from "../controllers/vendorTypeController";
import { VendorController } from "../controllers/vendorController";
<<<<<<< Updated upstream
=======
import { PaymentController } from "../controllers/paymentController";
import adminAuth from "../middlewares/adminAuth";
>>>>>>> Stashed changes
const router = express.Router();


router.post('/login' , AdminController.Adminlogin);
router.get('/logout' ,adminAuth,AdminController.Adminlogout);
router.post('/refresh-token' , AdminController.createRefreshToken)
//user
router.get('/users' ,adminAuth, UserController.allUsers);
router.patch('/block-unblock' , UserController.Toggleblock)

//Vendor
router.patch('/vendorblock-unblock', VendorController.Toggleblock)
router.get('/getvendor',adminAuth, VendorController.getVendor)
router.get('/getvendors' ,adminAuth,VendorController.getAllVendors )

//vendorType
router.post('/add-type' , VendorTypeController.addVendorType);
router.get('/vendor-types' ,adminAuth,VendorTypeController.getVendorTypes);
router.delete('/delete-vendortype',VendorTypeController.deleteVendorType)
router.get("/single-type",adminAuth,VendorTypeController.LoadSingleType)
router.put("/update-type",VendorTypeController.updateType)

<<<<<<< Updated upstream
=======
router.get('/all-payment-details',adminAuth,PaymentController.getAllPayments);

router.put('/update-verify-status',VendorController.updateVerifyStatus);
router.get('/load-admin-data',AdminController.getAdminData)

>>>>>>> Stashed changes
export default router;



