import Review,{ ReviewDocument } from "../models/reviewModel";
import { BaseRepository } from "./baseRepository";

export class ReviewRepository extends BaseRepository<ReviewDocument>{
  constructor(){
    super(Review);
  }
}