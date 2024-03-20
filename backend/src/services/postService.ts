
import { createNewPost } from "../repositories/postRepository";
import mongoose from "mongoose";

export const createPost=async(caption:string,imageName:string,vendor_id:string): Promise<object>=>{
    try{
      const vendorIdObjectId =new mongoose.Types.ObjectId(vendor_id) as unknown as mongoose.Schema.Types.ObjectId;
      const add= await createNewPost({caption , image:imageName, vendor_id:vendorIdObjectId});
      return {post:add};
    } catch (error) {
      throw error;
    }
  }