"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const vendorModel_1 = __importDefault(require("../models/vendorModel"));
const reviewRepository_1 = __importDefault(require("../repositories/reviewRepository"));
const customError_1 = require("../error/customError");
const notificationModel_1 = __importStar(require("../models/notificationModel"));
class ReviewService {
    addNewReview(content, rating, user_Id, vendor_Id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorId = new mongoose_1.default.Types.ObjectId(vendor_Id);
                const userId = new mongoose_1.default.Types.ObjectId(user_Id);
                const vendorData = yield vendorModel_1.default.findById(vendorId);
                if (!vendorData) {
                    throw new customError_1.CustomError("Vendor not found.", 404);
                }
                const data = yield reviewRepository_1.default.create({
                    content,
                    rating,
                    userId,
                    vendorId,
                });
                const newNotification = new notificationModel_1.default({
                    recipient: vendorId,
                    message: "New review added!",
                    type: notificationModel_1.NOTIFICATION_TYPES.REVIEW,
                });
                yield newNotification.save();
                const vendorReview = yield reviewRepository_1.default.findByCondition({
                    vendorId: vendorId,
                });
                const vendorRatings = vendorReview.map((review) => review.rating);
                vendorData.totalRating = calculateOverallRating(vendorRatings);
                yield vendorData.save();
                return true;
            }
            catch (error) {
                console.error("Error in addNewReview:", error);
                throw new customError_1.CustomError("Failed to add new review.", 500);
            }
        });
    }
    addReviewReply(content, reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield reviewRepository_1.default.getById(reviewId);
                if (!review) {
                    throw new customError_1.CustomError("Review not found.", 404);
                }
                const updateReply = yield reviewRepository_1.default.addReply(content, reviewId);
                return updateReply;
            }
            catch (error) {
                console.error("Error in addReviewReply:", error);
                throw new customError_1.CustomError("Failed to add review reply.", 500);
            }
        });
    }
    getReviewsForVendor(vendorId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield reviewRepository_1.default.getReviewsByVendorId(vendorId, page, pageSize);
            }
            catch (error) {
                console.error("Error in getReviewsForVendor:", error);
                throw new customError_1.CustomError("Failed to get reviews for vendor.", 500);
            }
        });
    }
    updateReviewContent(reviewId, review) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield reviewRepository_1.default.update(reviewId, {
                    content: review,
                });
                return reviews;
            }
            catch (error) {
                console.error("Error in updateReviewContent:", error);
                throw new customError_1.CustomError("Failed to update review content.", 500);
            }
        });
    }
    getReviewStatisticsByVendorId(vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reviews } = yield reviewRepository_1.default.getReviewsByVendorId(vendorId, 1, 1);
                console.log(reviews);
                const ratingCounts = [0, 0, 0, 0, 0];
                reviews === null || reviews === void 0 ? void 0 : reviews.forEach((review) => {
                    if (review.rating >= 1 && review.rating <= 5) {
                        ratingCounts[review.rating - 1] += 1;
                    }
                });
                const totalReviews = reviews === null || reviews === void 0 ? void 0 : reviews.length;
                const ratingPercentages = ratingCounts.map((count) => totalReviews > 0 ? (count / totalReviews) * 100 : 0);
                return ratingPercentages;
            }
            catch (error) {
                console.error("Error in getReviewStatisticsByVendorId:", error);
                throw new customError_1.CustomError("Failed to get review statistics.", 500);
            }
        });
    }
}
exports.default = new ReviewService();
// const calculateOverallRating = (ratings: any[]) => {
//   const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
//   return ratings.length > 0 ? Math.round((totalRating / ratings.length),1 ):0;
// };
const calculateOverallRating = (ratings) => {
    const validRatings = ratings.filter((rating) => typeof rating === "number" && !isNaN(rating));
    if (validRatings.length === 0) {
        return 0;
    }
    const totalRating = validRatings.reduce((acc, rating) => acc + rating, 0);
    const averageRating = totalRating / validRatings.length;
    return Math.round(averageRating * 10) / 10;
};
