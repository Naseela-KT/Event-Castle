import User , {UserDocument} from "../models/user";
import { Document } from 'mongoose';

export const createUser = async (userData: Partial<UserDocument>): Promise<UserDocument> => {
    try {
      return await User.create(userData);
    } catch (error) {
      throw error;
    }
  };
  
  export const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw error;
    }
  };

  export const findAllUsers = async (): Promise<Document[] | null> => {
    try {
      return await User.find({}).exec();
    } catch (error) {
      throw error;
    }
  }; 

  export const UpdatePassword = async(password:string , mail:string) =>{
    try {
      const result = await User.updateOne({ email: mail }, { password: password });
      if (result.modifiedCount === 1) {
        return { success: true, message: "Password updated successfully." };
      } else {
        return { success: false, message: "User not found or password not updated." };
      }
    } catch (error) {
      throw error;
    }
  }