"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vendorController_1 = __importDefault(require("../controllers/vendorController"));
const vendorTypeController_1 = __importDefault(require("../controllers/vendorTypeController"));
const multer_1 = __importDefault(require("multer"));
const postController_1 = __importDefault(require("../controllers/postController"));
const bookingController_1 = __importDefault(require("../controllers/bookingController"));
const notificationController_1 = __importDefault(require("../controllers/notificationController"));
const messageController_1 = __importDefault(require("../controllers/messageController"));
const reviewController_1 = __importDefault(require("../controllers/reviewController"));
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const coverpicUpload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const logoUpload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
//Auth
router.post("/signup", vendorController_1.default.vendorSignup);
router.post("/verify", vendorController_1.default.verifyOtp);
router.get("/resendOtp", vendorController_1.default.ResendOtp);
router.get("/pwd-resendOtp", vendorController_1.default.PwdResendOtp);
router.post("/login", vendorController_1.default.VendorLogin);
router.post("/refresh-token", vendorController_1.default.createRefreshToken);
router.get("/logout", vendorController_1.default.VendorLogout);
router.get("/vendor-types", vendorTypeController_1.default.getVendorTypes);
router.post("/vendor-getotp", vendorController_1.default.VendorForgotPassword);
router.post("/verifyVendorotp", vendorController_1.default.VerifyOtpForPassword);
router.post("/reset-password", vendorController_1.default.ResetVendorPassword);
//Profile
router.get("/getvendors", vendorController_1.default.getAllVendors);
router.post("/add-post", upload.single("image"), postController_1.default.addNewPost);
router.get("/posts", postController_1.default.getPosts);
router.delete("/posts/:id", postController_1.default.deletePost);
router.get("/getvendor", vendorController_1.default.getVendor);
router.patch("/update-password", vendorController_1.default.updatePassword);
router.put("/update-profile", upload.fields([
    { name: "coverpic", maxCount: 1 },
    { name: "logo", maxCount: 1 },
]), vendorController_1.default.updateProfile);
router.get("/getReviews", reviewController_1.default.getReviews);
router.put("/add-review-reply", reviewController_1.default.addReviewReply);
router.get("/booking-details", bookingController_1.default.getBookingsByVendor);
router.get("/single-booking-details", bookingController_1.default.getBookingsById);
router.put("/update-booking-status", bookingController_1.default.updateStatus);
router.post("/verification-request", vendorController_1.default.sendVerifyRequest);
router.post("/add-dates", vendorController_1.default.addDates);
router.get("/load-dates", vendorController_1.default.loadDates);
router.get("/vendor-notifications", notificationController_1.default.getAllNotifications);
router.patch("/toggle-read", notificationController_1.default.toggleRead);
router.delete("/notification", notificationController_1.default.deleteNotification);
//message
router.patch("/delete-for-everyone", messageController_1.default.deleteAMessage);
router.patch("/delete-for-me", messageController_1.default.changeViewMessage);
//dashboard
router.get("/revenue", vendorController_1.default.getRevenue);
router.get("/reviews/statistics", reviewController_1.default.getReviewStatistics);
exports.default = router;
