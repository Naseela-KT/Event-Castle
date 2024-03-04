import { Request , Response } from "express";
import { signup , login } from "../services/vendorService";


export const VendorController = {

    async vendorSignup(req: Request, res: Response): Promise<void> {
        try {
          const { email , password , name , phone , city } = req.body;
          console.log(req.body)
          const vendor = await signup(email , password , name , phone , city);
          res.status(201).json(vendor);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server Error' });
        }
      },



      async VendorLogin(req:Request , res: Response): Promise <void> {
        try {
            const {email,password} = req.body;
            const { token, vendorData, message } = await login(email, password);
            res.cookie('jwtToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            res.status(200).json({token, vendorData, message });
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Server Error"})
            
        }
      } ,
    

      async VendorLogout(req:Request , res: Response): Promise <void> {
        try {
          res.clearCookie('jwtToken');
          res.status(200).json({ message: 'vendor logged out successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Server Error"})
            
        }
      }

}