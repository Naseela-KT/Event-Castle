"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../controllers/adminController"));
const userController_1 = __importDefault(require("../controllers/userController"));
const vendorTypeController_1 = __importDefault(require("../controllers/vendorTypeController"));
const vendorController_1 = __importDefault(require("../controllers/vendorController"));
const paymentController_1 = __importDefault(require("../controllers/paymentController"));
const adminAuthMiddleware_1 = __importDefault(require("../middlewares/adminAuthMiddleware"));
const notificationController_1 = __importDefault(require("../controllers/notificationController"));
const adminController_2 = __importDefault(require("../controllers/adminController"));
const router = express_1.default.Router();
//Auth
router.post('/login', adminController_1.default.Adminlogin);
router.get('/logout', adminController_1.default.Adminlogout);
router.post('/refresh-token', adminController_1.default.createRefreshToken);
//user
router.get('/users', adminAuthMiddleware_1.default, userController_1.default.allUsers);
router.patch('/block-unblock', userController_1.default.Toggleblock);
//Vendor
router.patch('/vendorblock-unblock', vendorController_1.default.Toggleblock);
router.get('/getvendor', adminAuthMiddleware_1.default, vendorController_1.default.getVendor);
router.get('/getvendors', adminAuthMiddleware_1.default, vendorController_1.default.getAllVendors);
router.put('/update-verify-status', vendorController_1.default.updateVerifyStatus);
//vendorType
router.post('/add-type', vendorTypeController_1.default.addVendorType);
router.get('/vendor-types', adminAuthMiddleware_1.default, vendorTypeController_1.default.getVendorTypes);
router.delete('/delete-vendortype', vendorTypeController_1.default.deleteVendorType);
router.get("/single-type", adminAuthMiddleware_1.default, vendorTypeController_1.default.LoadSingleType);
router.put("/update-type", vendorTypeController_1.default.updateType);
//Payment
router.get('/load-admin-data', adminController_1.default.getAdminData);
router.get('/all-payment-details', adminAuthMiddleware_1.default, paymentController_1.default.getAllPayments);
router.get('/all-payment-details', paymentController_1.default.getAllPayments);
//Notification
router.get('/admin-notifications', notificationController_1.default.getAllNotifications);
router.patch('/toggle-read', notificationController_1.default.toggleRead);
router.delete("/notification", notificationController_1.default.deleteNotification);
//dashboard
router.get("/revenue", adminController_2.default.getRevenue);
router.get("/dashboard-stats", adminController_2.default.getCounts);
exports.default = router;
