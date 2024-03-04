import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createVendor , findvendorByEmail } from '../repositories/vendorRepository';


interface LoginResponse {
  token: string;
  vendorData: object; 
  message: string;
}

export const signup = async (email:string ,password:string, name:string , phone:number, city:string): Promise<string> => {
    try {
      const existingVendor = await findvendorByEmail(email);
      if (existingVendor) {
        throw new Error('vendor already exists');
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const isActive:boolean = true;
      const isVerified:boolean=false;
      const verificationRequest:boolean=false;
      const totalBooking:number=0;

      const newVendor = await createVendor({ email , password: hashedPassword , name , phone , city , isActive , isVerified , verificationRequest , totalBooking });
  
      const token = jwt.sign({ _id: newVendor._id }, process.env.JWT_SECRET!);
     
      return token;

    } catch (error) {
      throw error;
    }
  };




  export const login = async (email:string , password : string): Promise<LoginResponse> =>{
    try {
        const existingVendor = await findvendorByEmail(email);
        if (!existingVendor) {
          throw new Error('vendor not exists..');
        }
    
        const passwordMatch = await bcrypt.compare( password, existingVendor.password);

        if (!passwordMatch) {
        throw new Error('Incorrect password..');
        }

        const vendorData = await findvendorByEmail(email);

        // If the password matches, generate and return a JWT token
        const token = jwt.sign({ _id: existingVendor._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return {token,vendorData:existingVendor,message:"Successfully logged in.."};
        
      } catch (error) {
        throw error;
      }
}