import Post, { PostDocument } from "../models/postModel";
import mongoose from "mongoose";
import PostRepository from "../repositories/postRepository";

class PostService {
  async createPost(
    caption: string,
    imageName: string,
    vendor_id: string,
    imageUrl: string
  ): Promise<object> {
    try {
      const vendorIdObjectId = new mongoose.Types.ObjectId(
        vendor_id
      ) as unknown as mongoose.Schema.Types.ObjectId;
      const add = await PostRepository.create({
        caption,
        image: imageName,
        vendor_id: vendorIdObjectId,
        imageUrl,
      });
      return { post: add };
    } catch (error) {
      throw error;
    }
  }

  async getAllPostsByVendor(vendor_id: string, page: number, pageSize: number) {
    try {
      const skip = (page - 1) * pageSize;
      const posts = await PostRepository.findPostsByVendorId(vendor_id)
        .skip(skip)
        .limit(pageSize);
      const totalPosts = await PostRepository.countDocuments({
        vendor_id: vendor_id,
      });
      return { posts, totalPosts };
    } catch (error) {
      throw error;
    }
  }

  async getPostById(_id: string): Promise<PostDocument | null> {
    try {
      const post = await PostRepository.getById(_id);
      return post;
    } catch (error) {
      throw error;
    }
  }

  async deletePostService(_id: string): Promise<PostDocument | null> {
    try {
      const post = await PostRepository.delete(_id);
      return post;
    } catch (error) {
      throw error;
    }
  }
}

export default new PostService();
