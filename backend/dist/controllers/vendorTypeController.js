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
class VendorTypeController {
    addVendorType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, status } = req.body;
                console.log(req.body);
                const vendor = yield vendorTypeService_1.default.addType(type, status);
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
                const { type, status } = req.body;
                const result = yield vendorTypeService_1.default.updateVendorType(vendorTypeId, type, status);
                res.status(200).json(result);
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "updateType");
            }
        });
    }
}
exports.default = new VendorTypeController();
