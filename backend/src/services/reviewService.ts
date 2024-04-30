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
        throw new CustomError("Vendor not found.", 404)
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
      console.error("Error in addNewReview:", error)
      throw new CustomError("Failed to add new review.", 500);
    }
  }

  async addReviewReply(content:string,reviewId:string): Promise<any> {
    try {
      const review=await reviewRepository.getById(reviewId)
      if (!review) {
        throw new CustomError("Review not found.", 404)
      }
      const updateReply= await reviewRepository.addReply(content,reviewId)
      return updateReply;
    } catch (error) {
      console.error("Error in addReviewReply:", error)
      throw new CustomError("Failed to add review reply.", 500);
    }
  }

  async getReviewsForVendor(vendorId:string): Promise<any> {
    try {
      const reviews=await reviewRepository.getReviewsByVendorId(vendorId)
      return reviews;
    } catch (error) {
      console.error("Error in getReviewsForVendor:", error)
      throw new CustomError("Failed to get reviews for vendor.", 500);
    }
  }

  async updateReviewContent(reviewId:string,review:string): Promise<any> {
    try {
      const reviews=await reviewRepository.update(reviewId,{content:review})
      return reviews;
    } catch (error) {
      console.error("Error in updateReviewContent:", error)
      throw new CustomError("Failed to update review content.", 500);
    }
  }


  async getReviewStatisticsByVendorId(vendorId: string): Promise<number[]> {
    try {
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
    } catch (error) {
      console.error("Error in getReviewStatisticsByVendorId:", error)
      throw new CustomError("Failed to get review statistics.", 500);
    }
   
  }
}

export default new ReviewService();


const calculateOverallRating = (ratings: any[]) => {
  const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
  return ratings.length > 0 ? totalRating / ratings.length : 0;
};

