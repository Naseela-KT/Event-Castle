"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postModel_1 = __importDefault(require("../models/postModel"));
const baseRepository_1 = require("./baseRepository");
class PostRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(postModel_1.default);
    }
    findPostsByVendorId(vendor_id) {
        return postModel_1.default.find({ vendor_id });
    }
}
exports.default = new PostRepository();
