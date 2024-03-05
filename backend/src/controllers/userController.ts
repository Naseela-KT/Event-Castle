import { Request , Response } from "express";
import { signup , login, getUsers } from "../services/userService";

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
            const { token, userData, message } = await login(email, password);
            res.cookie('jwtToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            res.status(200).json({token, userData, message });
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Server Error"})
            
        }
      } ,
    
     
      async UserLogout(req:Request , res: Response): Promise <void> {
        try {
          res.clearCookie('jwtToken');
          res.status(200).json({ message: 'User logged out successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Server Error"})
            
        }
      },

      async allUsers(req: Request, res: Response): Promise<void>{
        try{
          const users = await getUsers();
          res.status(200).json(users);
        }catch(error){
          console.log(error);
          res.status(500).json({ message: "server error..." });
        }
      } 
};