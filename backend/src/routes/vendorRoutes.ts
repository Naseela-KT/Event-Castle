import express from 'express';
import { VendorController } from '../controllers/vendorController';
import  VendorTypeController  from '../controllers/vendorTypeController';


import multer from 'multer';
import  PostController  from '../controllers/postController';
import BookingController from '../controllers/bookingController';
import  NotificationController from '../controllers/notificationController';
import MessageController from '../controllers/messageController';
import reviewController from '../controllers/reviewController';
const router = express.Router();


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const coverpicUpload = multer({ storage: multer.memoryStorage() });
const logoUpload = multer({ storage: multer.memoryStorage() });


//Auth
router.post('/signup' , VendorController.vendorSignup);
router.post('/verify' ,VendorController.verifyOtp)
router.get('/resendOtp' ,VendorController.ResendOtp);
router.get('/pwd-resendOtp' ,VendorController.PwdResendOtp);
router.post('/login' , VendorController.VendorLogin)
router.post('/refresh-token' , VendorController.createRefreshToken)
router.get('/logout' , VendorController.VendorLogout)
router.get('/vendor-types' , VendorTypeController.getVendorTypes);
router.post('/vendor-getotp' , VendorController.VendorForgotPassword)
router.post('/verifyVendorotp' , VendorController.VerifyOtpForPassword)
router.post('/reset-password' , VendorController.ResetVendorPassword)


//Profile

router.get('/getvendors' ,VendorController.getAllVendors )
router.post("/add-post",upload.single('image'),PostController.addNewPost)
router.get("/posts",PostController.getPosts)
router.delete("/posts/:id",PostController.deletePost)
router.get('/getvendor',VendorController.getVendor)
router.patch('/update-password',VendorController.updatePassword)
router.put('/update-profile',upload.fields([{ name: 'coverpic', maxCount: 1 }, { name: 'logo', maxCount: 1 }]),VendorController.updateProfile)


router.get("/getReviews",reviewController.getReviews)
router.put('/add-review-reply',reviewController.addReviewReply)

router.get('/booking-details',BookingController.getBookingsByVendor);
router.get('/single-booking-details',BookingController.getBookingsById);
router.put('/update-booking-status',BookingController.updateStatus)
router.post('/verification-request',VendorController.sendVerifyRequest)
router.post('/add-dates',VendorController.addDates)
router.get('/load-dates',VendorController.loadDates)
router.get('/vendor-notifications',NotificationController.getAllNotifications)
router.patch('/toggle-read',NotificationController.toggleRead)
router.delete("/notification",NotificationController.deleteNotification)


//message
router.patch('/delete-for-everyone',MessageController.deleteAMessage)
router.patch('/delete-for-me',MessageController.changeViewMessage)


export default router;