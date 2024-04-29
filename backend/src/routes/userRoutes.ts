import express from "express";
import UserController from "../controllers/userController";
import VendorController  from "../controllers/vendorController";
import multer from "multer";
import PostController from "../controllers/postController";
import BookingController  from "../controllers/bookingController";
import PaymentController from "../controllers/paymentController";
import  VendorTypeController  from "../controllers/vendorTypeController";
import NotificationController from "../controllers/notificationController";
import LiveController from "../controllers/liveController";
import MessageController from "../controllers/messageController";
import ReviewController from "../controllers/reviewController";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

//Auth
router.post("/signup", UserController.UserSignup);
router.post("/verify", UserController.verifyOtp);
router.get("/resendOtp", UserController.ResendOtp);
router.get("/pwd-resendOtp", UserController.PwdResendOtp);
router.post("/login", UserController.UserLogin);
router.get("/logout", UserController.UserLogout);
router.post("/refresh-token", UserController.createRefreshToken);
router.post("/getotp", UserController.UserForgotPassword);
router.post("/verify-otp", UserController.VerifyOtpForPassword);
router.post("/reset-password", UserController.ResetUserPassword);
router.post("/google/login", UserController.googleLogin);
router.post("/google/register", UserController.googleRegister);

//Home
router.get("/getvendors", VendorController.getAllVendors);
router.get("/vendor-types", VendorTypeController.getVendorTypes);
router.get("/get-locations",VendorController.getLocations);

router.get("/getvendor", VendorController.getVendor);

router.post("/addVendorReview", ReviewController.addReview);
router.get("/getReviews",ReviewController.getReviews)



//Profile
router.post("/update-password", UserController.updatePasswordController);
router.put(
  "/update-profile",
  upload.single("image"),
  UserController.updateProfile
);
router.get("/posts", PostController.getPosts);
router.delete("/posts/:id", PostController.deletePost);
router.post("/add-favorite-vendor", UserController.AddFavVendor);
router.get("/get-favorite-vendor", UserController.getFavoriteVendors);
router.delete("/delete-favorite-vendor", UserController.deleteFavoriteVendor);
router.post("/book-an-event", BookingController.bookAnEvent);
router.get("/get-bookings", BookingController.getBookingsByUser);
router.get("/single-booking", BookingController.getBookingsById);
router.post("/create-checkout-session", PaymentController.makePayment);
router.post("/add-payment", PaymentController.addPayment);
router.put("/cancel-booking", BookingController.cancelBookingByUser);
router.get("/all-transaction-details", BookingController.getRefundDetails);

router.get("/user-notifications", NotificationController.getAllNotifications);
router.delete("/notification",NotificationController.deleteNotification)
router.get("/notification-count", NotificationController.getCount);


// Live
router.get("/get-live", LiveController.getLive);
router.post("/add-live", LiveController.addLive);
router.patch("/change-live-status", LiveController.changeLiveStatus);
router.patch("/toggle-read", NotificationController.toggleRead);

//Chat
router.patch("/delete-for-everyone", MessageController.deleteAMessage);
router.patch("/delete-for-me", MessageController.changeViewMessage);
router.get("/getUser", UserController.getUser);


//Review
router.patch("/update-review",ReviewController.updateReview)

export default router;
