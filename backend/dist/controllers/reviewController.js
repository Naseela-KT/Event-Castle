"use strict";
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
const reviewService_1 = __importDefault(require("../services/reviewService"));
const customError_1 = require("../error/customError");
const handleError_1 = require("../utils/handleError");
class ReviewController {
    addReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const content = req.body.content;
                const rating = req.body.rating;
                const user_Id = req.body.userId;
                const vendor_Id = req.body.vendorId;
                const status = yield reviewService_1.default.addNewReview(content, rating, user_Id, vendor_Id);
                if (!status) {
                    res
                        .status(400)
                        .json({ error: `couldn't add reviews, some error occured` });
                }
                res.status(200).json({ message: "review added for vendor.." });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "addReview");
            }
        });
    }
    addReviewReply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewId = req.query.reviewId;
                const content = req.body.content;
                const result = yield reviewService_1.default.addReviewReply(content, reviewId);
                res.status(200).json({ vendorData: result });
            }
            catch (error) {
                if (error instanceof customError_1.CustomError) {
                    res.status(error.statusCode).json({ message: error.message });
                }
                else {
                    (0, handleError_1.handleError)(res, error, "addReviewReply");
                }
            }
        });
    }
    getReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorId = req.query.vendorId;
                const page = parseInt(req.query.page) || 1;
                const pageSize = parseInt(req.query.pageSize) || 6;
                const { reviews, count } = yield reviewService_1.default.getReviewsForVendor(vendorId, page, pageSize);
                const totalPages = Math.ceil(count / pageSize);
                res.status(200).json({ reviews, totalPages });
            }
            catch (error) {
                if (error instanceof customError_1.CustomError) {
                    res.status(error.statusCode).json({ message: error.message });
                }
                else {
                    (0, handleError_1.handleError)(res, error, "getReviews");
                }
            }
        });
    }
    updateReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reviewId, review } = req.body;
                const updateReview = yield reviewService_1.default.updateReviewContent(reviewId, review);
                res.status(200).json({ updateReview });
            }
            catch (error) {
                if (error instanceof customError_1.CustomError) {
                    res.status(error.statusCode).json({ message: error.message });
                }
                else {
                    (0, handleError_1.handleError)(res, error, "updateReview");
                }
            }
        });
    }
    getReviewStatistics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { vendorId } = req.query;
            try {
                const percentages = yield reviewService_1.default.getReviewStatisticsByVendorId(vendorId);
                res.status(200).json({ percentages }); // Return the percentages
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getReviewStatistics");
            }
        });
    }
}
;
exports.default = new ReviewController();
