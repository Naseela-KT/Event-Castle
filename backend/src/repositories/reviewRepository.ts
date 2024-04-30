import Review,{ ReviewDocument } from "../models/reviewModel";
import { BaseRepository } from "./baseRepository";

class ReviewRepository extends BaseRepository<ReviewDocument>{
  constructor(){
    super(Review);
  }

  async addReply(content:string,reviewId:string){
      const data= await Review.findByIdAndUpdate(
        reviewId,
        { $push: { reply: content } }
    );
      return data
   
  }

  async getReviewsByVendorId(vendorId:string){
     return await Review.find({vendorId:vendorId}).populate('vendorId').populate('userId')
    
  }

}

export default new ReviewRepository();




