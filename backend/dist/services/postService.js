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
const mongoose_1 = __importDefault(require("mongoose"));
const postRepository_1 = __importDefault(require("../repositories/postRepository"));
const customError_1 = require("../error/customError");
class PostService {
    createPost(caption, imageName, vendor_id, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorIdObjectId = new mongoose_1.default.Types.ObjectId(vendor_id);
                const add = yield postRepository_1.default.create({
                    caption,
                    image: imageName,
                    vendor_id: vendorIdObjectId,
                    imageUrl,
                });
                return { post: add };
            }
            catch (error) {
                console.error("Error in createPost:", error);
                throw new customError_1.CustomError("Failed to create post.", 500);
            }
        });
    }
    getAllPostsByVendor(vendor_id, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skip = (page - 1) * pageSize;
                const posts = yield postRepository_1.default.findPostsByVendorId(vendor_id)
                    .skip(skip)
                    .limit(pageSize);
                const totalPosts = yield postRepository_1.default.countDocuments({
                    vendor_id: vendor_id,
                });
                return { posts, totalPosts };
            }
            catch (error) {
                console.error("Error in getAllPostsByVendor:", error);
                throw new customError_1.CustomError("Failed to get posts by vendor.", 500);
            }
        });
    }
    getPostById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield postRepository_1.default.getById(_id);
                if (!post) {
                    throw new customError_1.CustomError(`Post with ID ${_id} not found.`, 404);
                }
                return post;
            }
            catch (error) {
                console.error("Error in getPostById:", error);
                throw new customError_1.CustomError("Failed to get post by ID.", 500);
            }
        });
    }
    deletePostService(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield postRepository_1.default.delete(_id);
                if (!post) {
                    throw new customError_1.CustomError(`Post with ID ${_id} not found.`, 404);
                }
                return post;
            }
            catch (error) {
                console.error("Error in deletePostService:", error);
                throw new customError_1.CustomError("Failed to delete post.", 500);
            }
        });
    }
}
exports.default = new PostService();
