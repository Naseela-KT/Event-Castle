
import Post , {PostDocument} from "../models/post";
import { createNewPost, findPostsByVendorId } from "../repositories/postRepository";
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

export const getAllPostsByVendor=async(vendor_id:string):Promise<PostDocument[]>=>{
  try{
    const posts=await findPostsByVendorId(vendor_id)
    return posts;
  } catch (error) {
    throw error;
  }
}