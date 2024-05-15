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

  async getReviewsByVendorId(vendorId:string,page: number, pageSize: number){
    const skip = (page - 1) * pageSize;
    const reviews=await Review.find({vendorId:vendorId}).populate('vendorId').populate('userId').sort({
      createdAt: -1})
      .skip(skip)
      .limit(pageSize)
      const count = await Review.countDocuments({vendorId:vendorId})
      return { reviews, count };
    
  }

}

export default new ReviewRepository();




