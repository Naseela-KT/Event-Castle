import { Request, Response } from "express";
import { CustomError } from "../error/customError";
import { addNewLive, changeStatus, getAllLive } from "../services/liveService";
import { addNewReview } from "../services/reviewService";

export const ReviewController = {
    async addReview(req: Request, res: Response): Promise<void> {
        try {
          const content = req.body.content;
          const rating: number = req.body.rate as number;
          console.log(rating);
          const userId: string = req.query.userId as string;
          const vendorId: string = req.query.vendorid as string;
    
          const status = await addNewReview(
            content,
            rating,
            userId,
            vendorId
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
      },

};
