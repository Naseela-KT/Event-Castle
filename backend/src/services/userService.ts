import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser , findUserByEmail } from '../repositories/userRepository';




export const signup = async (email:string ,password:string, name:string , phone:number): Promise<object> => {
    try {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        throw new Error('User already exists');
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const isActive:boolean = true;
      const newUser = await createUser({ email , password: hashedPassword , name , phone , isActive });
  
      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET!);
      return {token:token,user:newUser};
    } catch (error) {
      throw error;
    }
  };
  


  export const login = async (email:string , password : string): Promise<string> =>{
    try {
        const existingUser = await findUserByEmail(email);
        if (!existingUser) {
          throw new Error('User not exists..');
        }
    
        const passwordMatch = await bcrypt.compare( password, existingUser.password);

        if (!passwordMatch) {
        throw new Error('Incorrect password..');
        }

        // If the password matches, generate and return a JWT token
        const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET!);
        return token;
        
      } catch (error) {
        throw error;
      }
}