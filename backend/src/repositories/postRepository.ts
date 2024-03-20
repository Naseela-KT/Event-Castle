import Post , {PostDocument} from "../models/post";


export const createNewPost=async (postData: Partial<PostDocument>): Promise<PostDocument> => {
    try {
      const result = await Post.create(postData);
      return result;
    } catch (error) {
      throw error;
    }
  }


export const findPostsByVendorId=async(vendor_id: string):Promise<PostDocument[]>=>{
  try {
    const result = await Post.find({vendor_id:vendor_id});
    return result;
  } catch (error) {
    throw error;
  }
}