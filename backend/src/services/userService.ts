import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UpdatePassword, addVendorToFavorites, createUser , deletefavVendor, findAllUsers, findUserByEmail, findUserById, findUserByIdAndUpdate, findUsersCount, getfavVendors } from '../repositories/userRepository';
import User , { UserDocument } from '../models/user';
import { CustomError } from '../controllers/userController';
import generateOtp from '../utils/generateOtp';
import generateUserTokenAndSetCookie from '../utils/generateUserToken';
import { Response } from 'express';

interface LoginResponse {
  token: string;
  userData: UserDocument; 
  message: string;
}

export const signup = async (email:string ,password:string, name:string , phone:number,res:Response): Promise<object> => {
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new CustomError('User already exists',404);
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const isActive:boolean = true;
    const newUser = await createUser({ email , password: hashedPassword , name , phone , isActive });
    generateUserTokenAndSetCookie(newUser._id,res)
  
    return {user:newUser};
  } catch (error) {
    throw error;
  }
};
  


export const googleSignup=async(email:string ,password:string, name:string): Promise<object> => {
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new CustomError('User already exists',404);
    }
    const isActive:boolean = true;
    const newUser = await createUser({ email , password, name , isActive });
    return {user:newUser};
  } catch (error) {
    throw error;
  }
};



export const gLogin=async (email: string, password: string): Promise<LoginResponse> => {
  try {
    console.log("in service",email,password)
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      throw new CustomError('User not exists..', 404); 
    }

    if(existingUser.isActive===false){
      throw new CustomError('Blocked by Admin..',404);
    }

    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return { token: token, userData: existingUser, message: 'Successfully logged in..' };

  } catch (error) {
    throw error; 
  }
}
  


export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      throw new CustomError('User not exists..', 404); 
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      throw new CustomError('Incorrect password..', 401);
    }

    if(existingUser.isActive===false){
      throw new CustomError('Blocked by Admin..',404);
    }

    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return { token: token, userData: existingUser, message: 'Successfully logged in..' };

  } catch (error) {
    throw error; 
  }
}



export const getUsers = async (page: number, limit: number, search: string) => {
  try {
    const users = await findAllUsers(page, limit, search);
    return users;
  } catch (error) {
    throw error;
  }
};


export const getUsersCount=async()=>{
  try {
    const total=await findUsersCount();
    return total;
  } catch (error) {
    throw error
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

export const generateOtpForPassword = async(email:string)=>{
  try {
    const otpCode = await generateOtp(email);
    if(otpCode !== undefined){ 
      return otpCode;
    }else{
      console.log("error on generating otp , please fix ..");
      throw new Error(`couldn't generate otp, error occcured ,please fix !!`)
    }
  } catch (error) {
    throw error;
  }
}


export const ResetPassword = async(password:string , email:string)=>{
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const status = await UpdatePassword(hashedPassword , email);
    if(!status.success){
      throw new Error(status.message)
    }
  } catch (error) {
    throw error;
  }
}

export const CheckExistingUSer = async(email:string)=>{
  try {
    const existingUser = await findUserByEmail(email);
    return existingUser;
  } catch (error) {
    throw error
  }
}

export const checkCurrentPassword = async(currentpassword:string , userId:string)=>{

  try {
    
    const existingUser = await findUserById(userId);

    if(!existingUser){
     throw new CustomError("user not found",404)
    }

    const passwordMatch = await bcrypt.compare(currentpassword, existingUser.password);
    if (!passwordMatch) {
      throw new CustomError("Password doesn't match",401)
    }

    return passwordMatch; 

  } catch (error) {
    throw error;
  }
}

export const updateProfileService= async(name:string , phone:number,image:string,userId:string,imageUrl:string)=>{
  try {
    const existingUser = await findUserById(userId);
    if(!existingUser){
      throw new CustomError('User not found',404)
    }
  const updatedData=await findUserByIdAndUpdate(name,phone,image,userId,imageUrl)
  const userData=await findUserById(userId)
     return userData;

  } catch (error) {
    throw error;
  }
}


export const UpdatePasswordService = async(newPassword:string , userId:string)=>{
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const existingUser = await findUserById(userId);
    if(!existingUser){
      throw new CustomError("user not found",404)
    }
    const email = existingUser.email;

    const updatedValue = await UpdatePassword(hashedPassword , email);
    if(updatedValue){
      return true;
    }
    return false
  } catch (error) {
    throw error;
  }
}

export const FavoriteVendor = async(vendorId:string , userId:string)=>{
  try {
    const result = await addVendorToFavorites(userId, vendorId);
    return result;
} catch (error) {
    console.error("Error in addToFavorites service:", error);
    throw new Error("Failed to add vendor to favorites.");
}
};

export const FavoriteVendors=async(userid:string)=>{
  try {
    const data = await getfavVendors(userid);
    return data;
  } catch (error) {
    throw error;
  }
}

export const deleteFromFavorite=async(userId:string,vendorId:string)=>{
  try {
    const data = await deletefavVendor(userId,vendorId);
    return data;
  } catch (error) {
    throw error;
  }
}


