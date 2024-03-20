import Post , {PostDocument} from "../models/post";


export const createNewPost=async (postData: Partial<PostDocument>): Promise<PostDocument> => {
    try {
      const result = await Post.create(postData);
      return result;
    } catch (error) {
      throw error;
    }
  }