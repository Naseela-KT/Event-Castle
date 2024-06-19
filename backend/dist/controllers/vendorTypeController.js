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
const vendorTypeService_1 = __importDefault(require("../services/vendorTypeService"));
const handleError_1 = require("../utils/handleError");
const crypto_1 = __importDefault(require("crypto"));
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
const vendorTypeModel_1 = __importDefault(require("../models/vendorTypeModel"));
const randomImage = (bytes = 32) => crypto_1.default.randomBytes(bytes).toString("hex");
dotenv_1.default.config();
const s3 = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    region: process.env.BUCKET_REGION,
});
class VendorTypeController {
    addVendorType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, status } = req.body;
                const file = req.file;
                const image = randomImage();
                const params = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: image,
                    Body: file === null || file === void 0 ? void 0 : file.buffer,
                    ContentType: file === null || file === void 0 ? void 0 : file.mimetype,
                };
                const command = new client_s3_1.PutObjectCommand(params);
                yield s3.send(command);
                let imageUrl = `${process.env.IMAGE_URL}/${image}`;
                const vendor = yield vendorTypeService_1.default.addType(type, status, image, imageUrl);
                res.status(201).json(vendor);
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "addVendorType");
            }
        });
    }
    getVendorTypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorTypes = yield vendorTypeService_1.default.getTypes();
                res.status(200).json(vendorTypes);
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getVendorTypes");
            }
        });
    }
    deleteVendorType(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorTypeId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.id;
                if (!vendorTypeId) {
                    res
                        .status(400)
                        .json({ message: "Vendor Type ID is missing or invalid." });
                    return;
                }
                const result = yield vendorTypeService_1.default.deleteType(vendorTypeId);
                res.status(200).json({ message: "Vendor deleted successfully" });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "deleteVendorType");
            }
        });
    }
    LoadSingleType(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorTypeId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.id;
                if (!vendorTypeId) {
                    res
                        .status(400)
                        .json({ message: "Vendor Type ID is missing or invalid." });
                    return;
                }
                const result = yield vendorTypeService_1.default.getSingleType(vendorTypeId);
                res.status(200).json(result);
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "LoadSingleType");
            }
        });
    }
    updateType(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorTypeId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.id;
                if (!vendorTypeId) {
                    res
                        .status(400)
                        .json({ message: "Vendor Type ID is missing or invalid." });
                    return;
                }
                const vendorType = yield vendorTypeModel_1.default.findOne({ _id: vendorTypeId });
                console.log(req.file);
                const { type, status } = req.body;
                let image = vendorType === null || vendorType === void 0 ? void 0 : vendorType.image;
                let imageUrl = vendorType === null || vendorType === void 0 ? void 0 : vendorType.imageUrl;
                if (req.file) {
                    const file = req.file;
                    image = randomImage();
                    const params = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: image,
                        Body: file === null || file === void 0 ? void 0 : file.buffer,
                        ContentType: file === null || file === void 0 ? void 0 : file.mimetype,
                    };
                    const command = new client_s3_1.PutObjectCommand(params);
                    yield s3.send(command);
                    imageUrl = `${process.env.IMAGE_URL}/${image}`;
                }
                const result = yield vendorTypeService_1.default.updateVendorType(vendorTypeId, type, status, image, imageUrl);
                res.status(200).json(result);
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "updateType");
            }
        });
    }
}
exports.default = new VendorTypeController();
