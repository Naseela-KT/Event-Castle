import { Request , Response } from "express";
import { login } from "../services/adminService";


export const AdminController = {

    async Adminlogin(req:Request , res:Response):Promise<void>{
        try {
            const {email , password} = req.body;
            const admin = await login(res,email,password);
            res.status(200).json(admin);
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"server error.."});
            
        }
    } , 



    async Adminlogout(req:Request , res:Response):Promise<void>{
        try {
            localStorage.removeItem('jwtToken');
            res.status(200).json({message:"admin logged out successfully.."});
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"server error..."})
            
        }
    }
}
