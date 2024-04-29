import mongoose from "mongoose";
import Vendor from "../models/vendorModel";
import reviewRepository from "../repositories/reviewRepository";
import { CustomError } from "../error/customError";
import notification, { NOTIFICATION_TYPES } from "../models/notificationModel";
import { ReviewDocument } from "../models/reviewModel";

class ReviewService{
  async addNewReview(content:string,rating:number,user_Id:string,vendor_Id:string){
    try {
      const vendorId = new mongoose.Types.ObjectId(
        vendor_Id
      ) as unknown as mongoose.Types.ObjectId;
      const userId = new mongoose.Types.ObjectId(
        user_Id
      ) as unknown as mongoose.Types.ObjectId;
      const vendorData = await Vendor.findById(vendorId);
      if (!vendorData) {
        throw new Error('Vendor not found');
      }
      const data = await reviewRepository.create({content,rating,userId,vendorId})
      const newNotification=new notification({
        recipient: vendorId,
        message:"New review added!",
        type:NOTIFICATION_TYPES.REVIEW
      })
  
      await newNotification.save();
      const vendorReview=await reviewRepository.findByCondition({vendorId:vendorId})
      const vendorRatings = vendorReview.map((review) => review.rating)
      vendorData.totalRating = calculateOverallRating(vendorRatings);
      await vendorData.save();
      return true;
    } catch (error) {
      throw error;
    }
  }

  async addReviewReply(content:string,reviewId:string): Promise<any> {
    try {
      const review=await reviewRepository.getById(reviewId)
      const updateReply= await reviewRepository.addReply(content,reviewId)
      return updateReply;
    } catch (error) {
      
    }
  }

  async getReviewsForVendor(vendorId:string): Promise<any> {
    try {
      const reviews=await reviewRepository.getReviewsByVendorId(vendorId)
      return reviews;
    } catch (error) {
      
    }
  }

  async updateReviewContent(reviewId:string,review:string): Promise<any> {
    try {
      const reviews=await reviewRepository.update(reviewId,{content:review})
      return reviews;
    } catch (error) {
      
    }
  }


  async getReviewStatisticsByVendorId(vendorId: string): Promise<number[]> {
    const reviews = await reviewRepository.getReviewsByVendorId(vendorId);
    console.log(reviews)
    const ratingCounts = [0, 0, 0, 0, 0]; 
    reviews?.forEach((review: ReviewDocument) => {
      if (review.rating >= 1 && review.rating <= 5) {
        ratingCounts[review.rating - 1] += 1;
      }
    });
    const totalReviews = reviews?.length;
    const ratingPercentages = ratingCounts.map((count) => (totalReviews! > 0 ? (count / totalReviews!) * 100 : 0));

    return ratingPercentages; 
  }
}

export default new ReviewService();


const calculateOverallRating = (ratings: any[]) => {
  const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
  return ratings.length > 0 ? totalRating / ratings.length : 0;
};

