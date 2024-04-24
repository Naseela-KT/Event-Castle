import Review,{ ReviewDocument } from "../models/reviewModel";
import { BaseRepository } from "./baseRepository";

class ReviewRepository extends BaseRepository<ReviewDocument>{
  constructor(){
    super(Review);
  }

  async addReply(content:string,reviewId:string){
    try {
      const data= await Review.findByIdAndUpdate(
        reviewId,
        { $push: { reply: content } }
    );
      return data
    } catch (error) {
      
    }
  }

  async getReviewsByVendorId(vendorId:string){
    try {
      const data= await Review.find({vendorId:vendorId}).populate('vendorId').populate('userId')
      return data
    } catch (error) {
      
    }
  }

}

export default new ReviewRepository();




