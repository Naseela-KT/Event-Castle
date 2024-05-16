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
const vendorRepository_1 = __importDefault(require("../repositories/vendorRepository"));
const customError_1 = require("../error/customError");
const vendorTypeRepository_1 = __importDefault(require("../repositories/vendorTypeRepository"));
const adminRepository_1 = __importDefault(require("../repositories/adminRepository"));
const notificationRepository_1 = __importDefault(require("../repositories/notificationRepository"));
const notificationModel_1 = require("../models/notificationModel");
class VendorService {
    signup(email, password, name, phone, city, vendor_type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingVendor = yield vendorRepository_1.default.findByEmail(email);
                if (existingVendor) {
                    throw new customError_1.CustomError("Vendor already exists", 409);
                }
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                const isActive = true;
                const isVerified = false;
                const verificationRequest = false;
                const totalBooking = 0;
                const vendorType = yield vendorTypeRepository_1.default.findByType(vendor_type);
                const newVendor = yield vendorRepository_1.default.create({
                    email,
                    password: hashedPassword,
                    name,
                    phone,
                    city,
                    isActive,
                    isVerified,
                    verificationRequest,
                    totalBooking,
                    vendor_type: vendorType === null || vendorType === void 0 ? void 0 : vendorType._id,
                });
                const token = jsonwebtoken_1.default.sign({ _id: newVendor._id }, process.env.JWT_SECRET);
                const Admin = yield adminRepository_1.default.findOne({});
                const adminNotification = yield notificationRepository_1.default.create({
                    recipient: Admin === null || Admin === void 0 ? void 0 : Admin._id,
                    message: `New vendor registered!`,
                    type: notificationModel_1.NOTIFICATION_TYPES.NEW_VENDOR,
                });
                return { vendor: newVendor, token };
            }
            catch (error) {
                console.error("Error in signup:", error);
                throw new customError_1.CustomError("Failed to create new vendor.", 500);
            }
        });
    }
    createRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                const Vendor = yield vendorRepository_1.default.getById(decoded._id);
                if (!Vendor || Vendor.refreshToken !== refreshToken) {
                    throw new customError_1.CustomError("Invalid refresh token.", 401);
                }
                const accessToken = jsonwebtoken_1.default.sign({ _id: Vendor._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
                return accessToken;
            }
            catch (error) {
                console.error("Error in createRefreshToken:", error);
                throw new customError_1.CustomError("Failed to create refresh token.", 500);
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingVendor = yield vendorRepository_1.default.findByEmail(email);
                if (!existingVendor) {
                    throw new customError_1.CustomError("vendor not exists..", 404);
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, existingVendor.password);
                if (!passwordMatch) {
                    throw new customError_1.CustomError("Incorrect password..", 401);
                }
                if (existingVendor.isActive === false) {
                    throw new customError_1.CustomError("Cannot login..!Blocked by Admin...", 401);
                }
                const vendorData = yield vendorRepository_1.default.findByEmail(email);
                // If the password matches, generate and return a JWT token
                const token = jsonwebtoken_1.default.sign({ _id: existingVendor._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
                let refreshToken = existingVendor.refreshToken;
                if (!refreshToken) {
                    refreshToken = jsonwebtoken_1.default.sign({ _id: existingVendor._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
                }
                existingVendor.refreshToken = refreshToken;
                yield existingVendor.save();
                return {
                    refreshToken,
                    token,
                    vendorData: existingVendor,
                    message: "Successfully logged in..",
                };
            }
            catch (error) {
                console.error("Error in login:", error);
                throw new customError_1.CustomError("Failed to log in.", 500);
            }
        });
    }
    CheckExistingVendor(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingVendor = yield vendorRepository_1.default.findByEmail(email);
                return existingVendor;
            }
            catch (error) {
                console.error("Error in CheckExistingVendor:", error);
                throw new customError_1.CustomError("Failed to check existing vendor.", 500);
            }
        });
    }
    getVendors(page, limit, search, category, location, sortValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendors = yield vendorRepository_1.default.findAllVendors(page, limit, search, category, location, sortValue);
                return vendors;
            }
            catch (error) {
                console.error("Error in getVendors:", error);
                throw new customError_1.CustomError("Failed to get vendors.", 500);
            }
        });
    }
    getVendorsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const total = yield vendorRepository_1.default.countDocuments();
                return total;
            }
            catch (error) {
                console.error("Error in getVendorsCount:", error);
                throw new customError_1.CustomError("Failed to get vendors count.", 500);
            }
        });
    }
    toggleVendorBlock(vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Vendor = yield vendorRepository_1.default.getById(vendorId);
                if (!Vendor) {
                    throw new customError_1.CustomError("Vendor not found.", 404);
                }
                Vendor.isActive = !Vendor.isActive; // Toggle the isActive field
                yield Vendor.save();
            }
            catch (error) {
                console.error("Error in toggleVendorBlock:", error);
                throw new customError_1.CustomError("Failed to toggle vendor block.", 500);
            }
        });
    }
    getSingleVendor(vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Vendor = yield vendorRepository_1.default.getById(vendorId);
                if (!Vendor) {
                    throw new customError_1.CustomError("Vendor not found.", 404);
                }
                return Vendor;
            }
            catch (error) {
                console.error("Error in getSingleVendor:", error);
                throw new customError_1.CustomError("Failed to retrieve vendor.", 500);
            }
        });
    }
    ResetVendorPasswordService(password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                const status = yield vendorRepository_1.default.UpdateVendorPassword(hashedPassword, email);
                if (!status.success) {
                    throw new customError_1.CustomError("Failed to reset password.", 500);
                }
            }
            catch (error) {
                console.error("Error in ResetVendorPasswordService:", error);
                throw new customError_1.CustomError("Failed to reset vendor password.", 500);
            }
        });
    }
    checkCurrentPassword(currentpassword, vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingVendor = yield vendorRepository_1.default.getById(vendorId);
                console.log(existingVendor);
                if (!existingVendor) {
                    throw new customError_1.CustomError("Vendor not found", 404);
                }
                const passwordMatch = yield bcrypt_1.default.compare(currentpassword, existingVendor.password);
                if (!passwordMatch) {
                    throw new customError_1.CustomError("Password doesn't match", 401);
                }
                return passwordMatch;
            }
            catch (error) {
                console.error("Error in checkCurrentPassword:", error);
                throw new customError_1.CustomError("Failed to check current password.", 500);
            }
        });
    }
    UpdatePasswordService(newPassword, vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, salt);
                const existingUser = yield vendorRepository_1.default.getById(vendorId);
                if (!existingUser) {
                    throw new customError_1.CustomError("user not found", 404);
                }
                const email = existingUser.email;
                const updatedValue = yield vendorRepository_1.default.UpdatePassword(hashedPassword, email);
                if (updatedValue) {
                    return true;
                }
                return false;
            }
            catch (error) {
                console.error("Error in UpdatePasswordService:", error);
                throw new customError_1.CustomError("Failed to update password.", 500);
            }
        });
    }
    updateVendor(vendorId, formData, coverpicUrl, logoUrl, logo, coverpic) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const update = {
                    name: formData.name,
                    city: formData.city,
                    phone: parseInt(formData.phone),
                    coverpicUrl: coverpicUrl,
                    logoUrl: logoUrl,
                    logo: logo,
                    coverpic: coverpic,
                };
                yield vendorRepository_1.default.update(vendorId, update);
                const updatedVendor = yield vendorRepository_1.default.getById(vendorId);
                return updatedVendor;
            }
            catch (error) {
                console.error("Error in updateVendor:", error);
                throw new customError_1.CustomError("Failed to update vendor.", 500);
            }
        });
    }
    verificationRequest(vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield vendorRepository_1.default.requestForVerification(vendorId);
                return data;
            }
            catch (error) {
                console.error("Error in verificationRequest:", error);
                throw new customError_1.CustomError("Failed to request verification.", 500);
            }
        });
    }
    changeVerifyStatus(vendorId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield vendorRepository_1.default.updateVerificationStatus(vendorId, status);
                return data;
            }
            catch (error) {
                console.error("Error in changeVerifyStatus:", error);
                throw new customError_1.CustomError("Failed to change verification status.", 500);
            }
        });
    }
    addDateAvailability(vendorId, status, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield vendorRepository_1.default.changeDateAvailability(vendorId, status, date);
                return data;
            }
            catch (error) {
                console.error("Error in addDateAvailability:", error);
                throw new customError_1.CustomError("Failed to add date availability.", 500);
            }
        });
    }
    getAllDates(vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield vendorRepository_1.default.getById(vendorId);
                return data === null || data === void 0 ? void 0 : data.bookedDates;
            }
            catch (error) {
                console.error("Error in getAllDates:", error);
                throw new customError_1.CustomError("Failed to get all dates.", 500);
            }
        });
    }
    getAllLocations() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield vendorRepository_1.default.findAllLocations();
                return data;
            }
            catch (error) {
                console.error("Error in getAllLocations:", error);
                throw new customError_1.CustomError("Failed to get all locations.", 500);
            }
        });
    }
}
exports.default = new VendorService();
