import { Request, Response } from "express";
import ReviewService from "../services/reviewService";
import { CustomError } from "../error/customError";
import { handleError } from "../utils/handleError";

class ReviewController{
    async addReview(req: Request, res: Response): Promise<void> {
        try {
          const content = req.body.content;
          const rating: number = req.body.rating as number;
          const user_Id: string = req.body.userId as string;
          const vendor_Id: string = req.body.vendorId as string;
    
          const status = await ReviewService.addNewReview(
            content,
            rating,
            user_Id,
            vendor_Id
          );
          if (!status) {
            res
              .status(400)
              .json({ error: `couldn't add reviews, some error occured` });
          }
          res.status(200).json({ message: "review added for vendor.." });
        } catch (error) {
          handleError(res, error, "addReview");
        }
      }

      async addReviewReply(req: Request, res: Response): Promise<void> {
        try {
          const reviewId: string = req.query.reviewId as string;
          const content = req.body.content;
          const result = await ReviewService.addReviewReply(
            content,
            reviewId
          );
          res.status(200).json({ vendorData: result });
        } catch (error) {
          if (error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message });
          } else {
            handleError(res, error, "addReviewReply");
          }
        }
      }

      async getReviews(req: Request, res: Response): Promise<void> {
        try {
          const vendorId: string = req.query.vendorId as string;
          const reviews=await ReviewService.getReviewsForVendor(vendorId)
          res.status(200).json({reviews});
        } catch (error) {
          if (error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message });
          } else {
            handleError(res, error, "getReviews");
          }
        }
      }

      async updateReview(req: Request, res: Response): Promise<void> {
        try {
          const {reviewId,review}= req.body as {reviewId:string,review:string};
          const updateReview=await ReviewService.updateReviewContent(reviewId,review)
          res.status(200).json({updateReview});
        } catch (error) {
          if (error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message });
          } else {
            handleError(res, error, "updateReview");
          }
        }
      }

      async getReviewStatistics(req: Request, res: Response) {
        const { vendorId } = req.query as {vendorId:string}; 
        try {
          const percentages = await ReviewService.getReviewStatisticsByVendorId(
            vendorId
          );
          res.status(200).json({ percentages }); // Return the percentages
        } catch (error) {
          handleError(res, error, "getReviewStatistics");
        }
      }


};

export default new ReviewController()
