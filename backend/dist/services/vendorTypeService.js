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
const customError_1 = require("../error/customError");
const vendorTypeRepository_1 = __importDefault(require("../repositories/vendorTypeRepository"));
class VendorTypeService {
    addType(type, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingType = yield vendorTypeRepository_1.default.findByType(type);
                if (existingType) {
                    throw new customError_1.CustomError("Type already exist!", 401);
                }
                const new_type = yield vendorTypeRepository_1.default.create({
                    type,
                    status: status === "Active",
                });
                return { message: "New Type added...", new_type };
            }
            catch (error) {
                console.error("Error in addType:", error);
                throw new customError_1.CustomError("Failed to add new vendor type.", 500);
            }
        });
    }
    getTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const availableTypes = yield vendorTypeRepository_1.default.getAll();
                return availableTypes;
            }
            catch (error) {
                console.error("Error in getTypes:", error);
                throw new customError_1.CustomError("Failed to retrieve vendor types.", 500);
            }
        });
    }
    deleteType(vendorTypeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield vendorTypeRepository_1.default.delete(vendorTypeId);
            }
            catch (error) {
                console.error("Error in deleteType:", error);
                throw new customError_1.CustomError("Failed to delete vendor type.", 500);
            }
        });
    }
    getSingleType(vendorTypeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorType = yield vendorTypeRepository_1.default.findOne({ _id: vendorTypeId });
                if (!vendorType) {
                    throw new customError_1.CustomError("Vendor type not found.", 404);
                }
                return vendorType;
            }
            catch (error) {
                console.error("Error in getSingleType:", error);
                throw new customError_1.CustomError("Failed to retrieve vendor type.", 500);
            }
        });
    }
    updateVendorType(vendorTypeId, type, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedType = yield vendorTypeRepository_1.default.update(vendorTypeId, {
                    type,
                    status: status === "Active" ? true : false,
                });
                return updatedType;
            }
            catch (error) {
                console.error("Error in updateVendorType:", error);
                throw new customError_1.CustomError("Failed to update vendor type.", 500);
            }
        });
    }
}
exports.default = new VendorTypeService();
