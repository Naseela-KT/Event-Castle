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

  
  export const findAllUsers = async (
    page: number,
    limit: number,
    search: string
  ): Promise<Document[] | null> => {
    try {
      const query = search
        ? {name: { $regex: new RegExp(search, 'i') }}
        : {};
      const users = await User.find(query)
        .skip((page - 1) * limit)
        .limit(limit);
  
      return users;
    } catch (error) {
      throw error;
    }
  };


  export const findUsersCount=async()=>{
    try {
      const result=await User.find({});
      return result.length;
    } catch (error) {
      throw error
    }
  }

  export const findUserById = async (
    userId: string
  ): Promise<UserDocument | null> => {
    try {
      return await User.findById( userId );
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


  export const findUserByIdAndUpdate= async(name:string , phone:number,image:string,userId:string,imageUrl:string) =>{
    try {
      const userData = await User.findOne({ _id: userId });

      // Prepare the update object
      const update = {
        name:"",
        phone:0,
        image:"",
        imageUrl:""


      };
  
      // Check if name is provided and not empty, otherwise use the current name
      if (name) {
        update.name = name;
      } else if (userData?.name) {
        update.name = userData?.name;
      }
  
      // Check if phone is provided and not empty, otherwise use the current phone
      if (phone) {
        update.phone = phone;
      } else if (userData?.phone) {
        update.phone = userData?.phone;
      }
  
      // Check if image is provided and not empty, otherwise use the current image
      if (image) {
        update.image = image;
      } else if (userData?.image) {
        update.image = userData?.image;
      }
  
      // Check if imageUrl is provided and not empty, otherwise use the current imageUrl
      if (imageUrl) {
        update.imageUrl = imageUrl;
      } else if (userData?.imageUrl) {
        update.imageUrl = userData.imageUrl;
      }
  
      // Perform the update
      const result = await User.updateOne({ _id: userId }, { $set: update });
  
      if (result.modifiedCount === 1) {
        return { success: true, message: "User updated successfully." };
      } else {
        return { success: false, message: "User not found or user not updated." };
      }
    } catch (error) {
      throw error;
    }
  }