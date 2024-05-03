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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminRepository_1 = __importDefault(require("../repositories/adminRepository"));
const customError_1 = require("../error/customError");
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const vendorRepository_1 = __importDefault(require("../repositories/vendorRepository"));
const bookingRepository_1 = __importDefault(require("../repositories/bookingRepository"));
class AdminService {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingAdmin = yield adminRepository_1.default.findByEmail(email);
                if (!existingAdmin) {
                    throw new customError_1.CustomError("Admin not exist", 400);
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, existingAdmin.password);
                if (!passwordMatch) {
                    throw new customError_1.CustomError("Incorrect password...", 401);
                }
                let refreshToken = existingAdmin.refreshToken;
                if (!refreshToken) {
                    refreshToken = jsonwebtoken_1.default.sign({ _id: existingAdmin._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
                }
                existingAdmin.refreshToken = refreshToken;
                yield existingAdmin.save();
                const token = jsonwebtoken_1.default.sign({ _id: existingAdmin._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
                return {
                    refreshToken,
                    token,
                    adminData: existingAdmin,
                    message: "Successfully logged in..",
                };
            }
            catch (error) {
                throw new customError_1.CustomError("An error occurred during login.", 500);
            }
        });
    }
    getDatas(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield adminRepository_1.default.getById(adminId);
                return result;
            }
            catch (error) {
                throw new customError_1.CustomError("An unexpected error occurred while fetching admin data.", 500);
            }
        });
    }
    createRefreshTokenAdmin(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                const Admin = yield adminRepository_1.default.getById(decoded._id);
                if (!Admin || Admin.refreshToken !== refreshToken) {
                    throw new Error("Invalid refresh token");
                }
                const accessToken = jsonwebtoken_1.default.sign({ _id: Admin._id }, process.env.JWT_SECRET, {
                    expiresIn: "24h",
                });
                return accessToken;
            }
            catch (error) {
                throw new customError_1.CustomError("An error occurred during createRefreshToken", 500);
            }
        });
    }
    findUsersCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userRepository_1.default.countDocuments();
            }
            catch (error) {
                console.error("Error fetching user count:", error);
                throw new customError_1.CustomError("Unable to fetch user count", 500);
            }
        });
    }
    findVendorsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield vendorRepository_1.default.countDocuments();
            }
            catch (error) {
                console.error("Error fetching vendor count:", error);
                throw new customError_1.CustomError("Unable to fetch vendor count", 500);
            }
        });
    }
    findBookingCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bookingRepository_1.default.countDocuments();
            }
            catch (error) {
                console.error("Error fetching booking count:", error);
                throw new customError_1.CustomError("Unable to fetch booking count", 500);
            }
        });
    }
}
exports.default = new AdminService();
