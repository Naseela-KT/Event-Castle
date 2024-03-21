import express from 'express';
import { VendorController } from '../controllers/vendorController';
import { VendorTypeController } from '../controllers/vendorTypeController';
import { S3Client,PutObjectCommand} from "@aws-sdk/client-s3";


import multer from 'multer';
import { PostController } from '../controllers/postController';
const router = express.Router();

// const storage = multer.diskStorage({
//  destination: function (req, file, cb) {
//     cb(null, '/tmp/my-uploads')
//  },
//  filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//  }
// });

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })




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


export default router;