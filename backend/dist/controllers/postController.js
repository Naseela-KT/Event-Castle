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
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
const sharp_1 = __importDefault(require("sharp"));
const customError_1 = require("../error/customError");
const postService_1 = __importDefault(require("../services/postService"));
const handleError_1 = require("../utils/handleError");
dotenv_1.default.config();
const s3 = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    region: process.env.BUCKET_REGION,
});
const randomImage = (bytes = 32) => crypto_1.default.randomBytes(bytes).toString("hex");
class PostController {
    addNewPost(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const caption = req.body.caption;
                const vendor_id = req.query.vendorid;
                console.log("req file.........");
                console.log(req.file);
                const buffer = yield (0, sharp_1.default)((_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer)
                    .resize({ height: 1920, width: 1080, fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 1 } })
                    .toBuffer();
                const imageName = randomImage();
                const params = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: imageName,
                    Body: buffer,
                    ContentType: (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype,
                };
                const command = new client_s3_1.PutObjectCommand(params);
                yield s3.send(command);
                // const getObjectParams={
                //   Bucket: process.env.BUCKET_NAME!,
                //   Key: imageName,
                // }
                // const command2 = new GetObjectCommand(getObjectParams);
                // const url = await getSignedUrl(s3, command, { expiresIn: 86400 * 6 });
                let imageUrl = `${process.env.IMAGE_URL}/${imageName}`;
                const post = yield postService_1.default.createPost(caption, imageName, vendor_id, imageUrl);
                res.status(201).json(post);
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "addNewPost");
            }
        });
    }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendor_id = req.query.vendorid;
                const page = parseInt(req.query.page) || 1;
                const pageSize = parseInt(req.query.pageSize) || 8;
                const { posts, totalPosts } = yield postService_1.default.getAllPostsByVendor(vendor_id, page, pageSize);
                const totalPages = Math.ceil(totalPosts / pageSize);
                res.status(201).json({ posts, totalPages: totalPages });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getPosts");
            }
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const post = yield postService_1.default.getPostById(id);
                if (!post) {
                    throw new customError_1.CustomError('Post not found!', 404);
                }
                const params = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: post === null || post === void 0 ? void 0 : post.image,
                };
                const command = new client_s3_1.DeleteObjectCommand(params);
                yield s3.send(command);
                yield postService_1.default.deletePostService(id);
                res.status(200).json({ message: "Post deleted successfully" });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "deletePost");
            }
        });
    }
}
;
exports.default = new PostController();
