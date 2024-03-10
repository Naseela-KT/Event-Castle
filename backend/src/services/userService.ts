import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser , findAllUsers, findUserByEmail } from '../repositories/userRepository';
import User , { UserDocument } from '../models/user';
import { CustomError } from '../controllers/userController';


interface LoginResponse {
  token: string;
  userData: UserDocument; 
  message: string;
}

export const signup = async (email:string ,password:string, name:string , phone:number ): Promise<object> => {
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
  


//   export const login = async (email:string , password : string): Promise<LoginResponse> =>{
//     try {
//         const existingUser = await findUserByEmail(email);
//         if (!existingUser) {
//           throw new Error('User not exists..');
//         }
    
//         const passwordMatch = await bcrypt.compare( password, existingUser.password);

//         if (!passwordMatch) {
//         throw new Error('Incorrect password..');
//         }
//         const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
//         return {token:token,userData:existingUser,message:"Successfully logged in.."};
        
//       } catch (error) {
//         throw error;
//       }
// }
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      throw new CustomError('User not exists..', 404); // CustomError includes a status code
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      throw new CustomError('Incorrect password..', 401);
    }

    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return { token: token, userData: existingUser, message: 'Successfully logged in..' };

  } catch (error) {
    throw error; // Let other errors propagate
  }
}




export const getUsers=async()=>{
  try {
    const users=await findAllUsers();
    return users;
  } catch (error) {
    throw error;
  }
}


export const toggleUserBlock = async(userId:string): Promise<void> =>{
  try {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    
    user.isActive = !user.isActive; // Toggle the isActive field
    await user.save();
} catch (error) {
    throw error;
}

}