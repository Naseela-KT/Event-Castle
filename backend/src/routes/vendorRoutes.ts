import express from 'express';
import { VendorController } from '../controllers/vendorController';
import { VendorTypeController } from '../controllers/vendorTypeController';
import { S3Client,PutObjectCommand} from "@aws-sdk/client-s3";


import multer from 'multer';
import { PostController } from '../controllers/postController';
import { BookingController } from '../controllers/bookingController';
const router = express.Router();


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const coverpicUpload = multer({ storage: multer.memoryStorage() });
const logoUpload = multer({ storage: multer.memoryStorage() });




router.post('/signup' , VendorController.vendorSignup);
router.post('/verify' ,VendorController.verifyOtp)
router.get('/resendOtp' ,VendorController.ResendOtp);
router.get('/pwd-resendOtp' ,VendorController.PwdResendOtp);
router.post('/login' , VendorController.VendorLogin)
router.get('/logout' , VendorController.VendorLogout)
router.get('/vendor-types' , VendorTypeController.getVendorTypes);
router.post('/vendor-getotp' , VendorController.VendorForgotPassword)
router.post('/verifyVendorotp' , VendorController.VerifyOtpForPassword)
router.get('/getvendors' ,VendorController.getAllVendors )
router.post('/reset-password' , VendorController.ResetVendorPassword)

router.post("/add-post",upload.single('image'),PostController.addNewPost)
router.get("/posts",PostController.getPosts)
router.delete("/posts/:id",PostController.deletePost)


router.get('/getvendor',VendorController.getVendor)
router.patch('/update-password',VendorController.updatePassword)
router.put('/update-profile',upload.fields([{ name: 'coverpic', maxCount: 1 }, { name: 'logo', maxCount: 1 }]),VendorController.updateProfile)

router.get('/get-all-reviews',VendorController.loadAllReviews)
router.put('/add-review-reply',VendorController.addReviewReply)


router.get('/booking-details',BookingController.getBookingsByVendor);
router.get('/single-booking-details',BookingController.getBookingsById);
router.put('/update-booking-status',BookingController.updateStatus)


router.post('/verification-request',VendorController.sendVerifyRequest)
router.post('/add-dates',VendorController.addDates)
router.get('/load-dates',VendorController.loadDates)


export default router;