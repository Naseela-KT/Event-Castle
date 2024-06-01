"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const vendorController_1 = __importDefault(require("../controllers/vendorController"));
const multer_1 = __importDefault(require("multer"));
const postController_1 = __importDefault(require("../controllers/postController"));
const bookingController_1 = __importDefault(require("../controllers/bookingController"));
const paymentController_1 = __importDefault(require("../controllers/paymentController"));
const vendorTypeController_1 = __importDefault(require("../controllers/vendorTypeController"));
const notificationController_1 = __importDefault(require("../controllers/notificationController"));
const liveController_1 = __importDefault(require("../controllers/liveController"));
const messageController_1 = __importDefault(require("../controllers/messageController"));
const reviewController_1 = __importDefault(require("../controllers/reviewController"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const router = express_1.default.Router();
//Auth
router.post("/signup", userController_1.default.UserSignup);
router.post("/verify", userController_1.default.verifyOtp);
router.get("/resendOtp", userController_1.default.ResendOtp);
router.get("/pwd-resendOtp", userController_1.default.PwdResendOtp);
router.post("/login", userController_1.default.UserLogin);
router.get("/logout", userController_1.default.UserLogout);
router.post("/refresh-token", userController_1.default.createRefreshToken);
router.post("/getotp", userController_1.default.UserForgotPassword);
router.post("/verify-otp", userController_1.default.VerifyOtpForPassword);
router.post("/reset-password", userController_1.default.ResetUserPassword);
router.post("/google/login", userController_1.default.googleLogin);
router.post("/google/register", userController_1.default.googleRegister);
router.post("/send-message", userController_1.default.sendMessage);
//Home
router.get("/getvendors", vendorController_1.default.getAllVendors);
router.get("/vendor-types", vendorTypeController_1.default.getVendorTypes);
router.get("/get-locations", vendorController_1.default.getLocations);
router.get("/getvendor", vendorController_1.default.getVendor);
router.post("/addVendorReview", reviewController_1.default.addReview);
router.get("/getReviews", reviewController_1.default.getReviews);
//Profile
router.post("/update-password", userController_1.default.updatePasswordController);
router.put("/update-profile", upload.single("image"), userController_1.default.updateProfile);
router.get("/posts", postController_1.default.getPosts);
router.delete("/posts/:id", postController_1.default.deletePost);
router.post("/add-favorite-vendor", userController_1.default.AddFavVendor);
router.get("/get-favorite-vendor", userController_1.default.getFavoriteVendors);
router.delete("/delete-favorite-vendor", userController_1.default.deleteFavoriteVendor);
router.post("/book-an-event", bookingController_1.default.bookAnEvent);
router.get("/get-bookings", bookingController_1.default.getBookingsByUser);
router.get("/single-booking", bookingController_1.default.getBookingsById);
router.post("/create-checkout-session", paymentController_1.default.makePayment);
router.post("/add-payment", paymentController_1.default.addPayment);
router.put("/cancel-booking", bookingController_1.default.cancelBookingByUser);
router.get("/all-transaction-details", bookingController_1.default.getRefundDetails);
router.get("/user-notifications", notificationController_1.default.getAllNotifications);
router.delete("/notification", notificationController_1.default.deleteNotification);
router.get("/notification-count", notificationController_1.default.getCount);
// Live
router.get("/get-live", liveController_1.default.getLive);
router.post("/add-live", liveController_1.default.addLive);
router.patch("/change-live-status", liveController_1.default.changeLiveStatus);
router.patch("/toggle-read", notificationController_1.default.toggleRead);
//Chat
router.patch("/delete-for-everyone", messageController_1.default.deleteAMessage);
router.patch("/delete-for-me", messageController_1.default.changeViewMessage);
router.get("/getUser", userController_1.default.getUser);
//Review
router.patch("/update-review", reviewController_1.default.updateReview);
exports.default = router;
