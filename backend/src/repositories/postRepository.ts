import Post , {PostDocument} from "../models/postModel";
import { BaseRepository } from "./baseRepository";


class PostRepository extends BaseRepository<PostDocument>{
  constructor(){
    super(Post)
  }

  findPostsByVendorId(vendor_id: string) {
    return Post.find({ vendor_id });
  }
}


export default new PostRepository();





