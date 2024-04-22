import Post , {PostDocument} from "../models/postModel";


export const createNewPost=async (postData: Partial<PostDocument>): Promise<PostDocument> => {
    try {
      const result = await Post.create(postData);
      return result;
    } catch (error) {
      throw error;
    }
  }


export const findPostsByVendorId=async(vendor_id: string,page:number,pageSize:number)=>{
  try {
    const skip = (page - 1) * pageSize;
    const posts = await Post.find({vendor_id:vendor_id}).skip(skip).limit(pageSize).exec();
    const totalPosts=await Post.countDocuments({ vendor_id:vendor_id })
    return {posts,totalPosts};
  } catch (error) {
    throw error;
  }
}

export const findPostById=async(_id: string):Promise<PostDocument | null>=>{
  try {
    const result = await Post.findById({_id});
    return result;
  } catch (error) {
    throw error;
  }
}


export const deletePostById=async(_id: string):Promise<PostDocument | null>=>{
  try {
    const result = await Post.findByIdAndDelete({_id});
    return result;
  } catch (error) {
    throw error;
  }
}