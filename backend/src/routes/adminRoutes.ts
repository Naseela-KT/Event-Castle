import express from "express";
import { AdminController } from "../controllers/adminController";
const router = express.Router();


router.post('/login' , AdminController.Adminlogin);
router.get('/logout' , AdminController.Adminlogout);


export default router;


