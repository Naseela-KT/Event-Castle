import { Request , Response } from "express";
import { signup , login } from "../services/userService";

export const  UserController = {

    async UserSignup(req: Request, res: Response): Promise<void> {
        try {
          const { email , password , name , phone } = req.body;
          const user = await signup(email , password , name , phone);
          res.status(201).json(user);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server Error' });
        }
      },

      async UserLogin(req:Request , res: Response): Promise <void> {
        try {
            const {email,password} = req.body;
            const loginresponse = await login(email,password);
            res.status(201).json(loginresponse);
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Server Error"})
            
        }
      } ,
    
     
      async UserLogout(req:Request , res: Response): Promise <void> {
        try {
          // localStorage.removeItem('jwtToken');
          res.status(200).json({ message: 'User logged out successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Server Error"})
            
        }
      }
};