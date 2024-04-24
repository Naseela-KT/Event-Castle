import { Request, Response } from "express";
import ReviewService from "../services/reviewService";
import { CustomError } from "../error/customError";

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
          console.error(error);
          res.status(500).json({ message: "Server Error" });
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
            console.error(error);
            res.status(500).json({ message: "Server Error" });
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
            console.error(error);
            res.status(500).json({ message: "Server Error" });
          }
        }
      }

};

export default new ReviewController()
