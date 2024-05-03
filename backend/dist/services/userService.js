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
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const generateOtp_1 = __importDefault(require("../utils/generateOtp"));
const generateUserToken_1 = __importDefault(require("../utils/generateUserToken"));
const customError_1 = require("../error/customError");
const adminRepository_1 = __importDefault(require("../repositories/adminRepository"));
const notificationRepository_1 = __importDefault(require("../repositories/notificationRepository"));
const notificationModel_1 = require("../models/notificationModel");
class UserService {
    signup(email, password, name, phone, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield userRepository_1.default.findByEmail(email);
                if (existingUser) {
                    throw new customError_1.CustomError("User already exists", 404);
                }
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                const isActive = true;
                const newUser = yield userRepository_1.default.create({
                    email,
                    password: hashedPassword,
                    name,
                    phone,
                    isActive,
                });
                (0, generateUserToken_1.default)(newUser._id, res);
                const Admin = yield adminRepository_1.default.findOne({});
                const adminNotification = yield notificationRepository_1.default.create({
                    recipient: Admin === null || Admin === void 0 ? void 0 : Admin._id,
                    message: `New user registered!`,
                    type: notificationModel_1.NOTIFICATION_TYPES.NEW_USER,
                });
                return { user: newUser };
            }
            catch (error) {
                console.error("Error in signup:", error);
                throw new customError_1.CustomError("Failed to sign up new user.", 500);
            }
        });
    }
    googleSignup(email, password, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield userRepository_1.default.findByEmail(email);
                if (existingUser) {
                    throw new customError_1.CustomError("User already exists", 404);
                }
                const isActive = true;
                const newUser = yield userRepository_1.default.create({
                    email,
                    password,
                    name,
                    isActive,
                });
                return { user: newUser };
            }
            catch (error) {
                console.error("Error in googleSignup:", error);
                throw new customError_1.CustomError("Failed to sign up with Google.", 500);
            }
        });
    }
    findUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userRepository_1.default.getById(userId);
                if (!user) {
                    throw new customError_1.CustomError("User not found.", 404);
                }
                return user;
            }
            catch (error) {
                console.error("Error in findUser:", error);
                throw new customError_1.CustomError("Failed to find user.", 500);
            }
        });
    }
    gLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("in service", email, password);
                const existingUser = yield userRepository_1.default.findByEmail(email);
                if (!existingUser) {
                    throw new customError_1.CustomError("User not exists..", 404);
                }
                if (existingUser.isActive === false) {
                    throw new customError_1.CustomError("Blocked by Admin..", 404);
                }
                const token = jsonwebtoken_1.default.sign({ _id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
                let refreshToken = jsonwebtoken_1.default.sign({ _id: existingUser._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
                existingUser.refreshToken = refreshToken;
                yield existingUser.save();
                return {
                    refreshToken,
                    token,
                    userData: existingUser,
                    message: "Successfully logged in..",
                };
            }
            catch (error) {
                console.error("Error in gLogin:", error);
                throw new customError_1.CustomError("Failed to log in.", 500);
            }
        });
    }
    createRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                const user = yield userRepository_1.default.getById(decoded._id);
                console.log("user", user);
                if (!user || user.refreshToken !== refreshToken) {
                    throw new customError_1.CustomError("Invalid refresh token.", 401);
                }
                const accessToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });
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
                const existingUser = yield userRepository_1.default.findByEmail(email);
                if (!existingUser) {
                    throw new customError_1.CustomError("User not exists..", 404);
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, existingUser.password);
                if (!passwordMatch) {
                    throw new customError_1.CustomError("Incorrect password..", 401);
                }
                if (existingUser.isActive === false) {
                    throw new customError_1.CustomError("Blocked by Admin..", 404);
                }
                const token = jsonwebtoken_1.default.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });
                let refreshToken = jsonwebtoken_1.default.sign({ _id: existingUser._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
                existingUser.refreshToken = refreshToken;
                yield existingUser.save();
                return {
                    refreshToken,
                    token,
                    userData: existingUser,
                    message: "Successfully logged in..",
                };
            }
            catch (error) {
                console.error("Error in login:", error);
                throw new customError_1.CustomError("Failed to log in.", 500);
            }
        });
    }
    getUsers(page, limit, search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userRepository_1.default.findAllUsers(page, limit, search);
                return users;
            }
            catch (error) {
                console.error("Error in getUsers:", error);
                throw new customError_1.CustomError("Failed to get users.", 500);
            }
        });
    }
    getUsersCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const total = yield userRepository_1.default.countDocuments();
                return total;
            }
            catch (error) {
                console.error("Error in getUsersCount:", error);
                throw new customError_1.CustomError("Failed to get users count.", 500);
            }
        });
    }
    toggleUserBlock(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userRepository_1.default.getById(userId);
                if (!user) {
                    throw new customError_1.CustomError("User not found.", 404);
                }
                user.isActive = !user.isActive; // Toggle the isActive field
                yield user.save();
            }
            catch (error) {
                console.error("Error in toggleUserBlock:", error);
                throw new customError_1.CustomError("Failed to toggle user block.", 500);
            }
        });
    }
    generateOtpForPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpCode = yield (0, generateOtp_1.default)(email);
                if (!otpCode) {
                    throw new customError_1.CustomError("Failed to generate OTP.", 500);
                }
                return otpCode;
            }
            catch (error) {
                console.error("Error in generateOtpForPassword:", error);
                throw new customError_1.CustomError("Failed to generate OTP for password reset.", 500);
            }
        });
    }
    ResetPassword(password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                const status = yield userRepository_1.default.UpdatePassword(hashedPassword, email);
                if (!status.success) {
                    throw new Error(status.message);
                }
            }
            catch (error) {
                console.error("Error in ResetPassword:", error);
                throw new customError_1.CustomError("Failed to reset password.", 500);
            }
        });
    }
    CheckExistingUSer(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield userRepository_1.default.findByEmail(email);
                return existingUser;
            }
            catch (error) {
                console.error("Error in CheckExistingUSer:", error);
                throw new customError_1.CustomError("Failed to check existing user.", 500);
            }
        });
    }
    checkCurrentPassword(currentpassword, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield userRepository_1.default.getById(userId);
                if (!existingUser) {
                    throw new customError_1.CustomError("user not found", 404);
                }
                const passwordMatch = yield bcrypt_1.default.compare(currentpassword, existingUser.password);
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
    updateProfileService(name, phone, image, userId, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield userRepository_1.default.getById(userId);
                if (!existingUser) {
                    throw new customError_1.CustomError("User not found", 404);
                }
                // const update = {
                //   name: "",
                //   phone: 0,
                //   image: "",
                //   imageUrl: "",
                // };
                // if (name) {
                //   update.name = name;
                // } else if (existingUser?.name) {
                //   update.name = existingUser?.name;
                // }
                // if (phone) {
                //   update.phone = phone;
                // } else if (existingUser?.phone) {
                //   update.phone = existingUser?.phone;
                // }
                // if (image) {
                //   update.image = image;
                // } else if (existingUser?.image) {
                //   update.image = existingUser?.image;
                // }
                // if (imageUrl) {
                //   update.imageUrl = imageUrl;
                // } else if (existingUser?.imageUrl) {
                //   update.imageUrl = existingUser.imageUrl;
                // }
                const update = {
                    name: name || existingUser.name,
                    phone: phone || existingUser.phone,
                    image: image || existingUser.image,
                    imageUrl: imageUrl || existingUser.imageUrl,
                };
                const result = yield userRepository_1.default.update(userId, update);
                const userData = yield userRepository_1.default.getById(userId);
                return userData;
            }
            catch (error) {
                console.error("Error in updateProfileService:", error);
                throw new customError_1.CustomError("Failed to update profile.", 500);
            }
        });
    }
    UpdatePasswordService(newPassword, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, salt);
                const existingUser = yield userRepository_1.default.getById(userId);
                if (!existingUser) {
                    throw new customError_1.CustomError("user not found", 404);
                }
                const email = existingUser.email;
                const updatedValue = yield userRepository_1.default.UpdatePassword(hashedPassword, email);
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
    FavoriteVendor(vendorId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userRepository_1.default.getById(userId);
                if (!user) {
                    throw new Error("User not found.");
                }
                if (user.favourite.includes(vendorId)) {
                    const index = user.favourite.indexOf(vendorId);
                    user.favourite.splice(index, 1);
                    yield user.save();
                    return false;
                }
                user.favourite.push(vendorId);
                yield user.save();
                return true;
            }
            catch (error) {
                console.error("Error in addToFavorites service:", error);
                throw new Error("Failed to add vendor to favorites.");
            }
        });
    }
    FavoriteVendors(userid, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield userRepository_1.default.getById(userid);
                if (!userData) {
                    throw new Error("User not found");
                }
                const favs = userData.favourite;
                if (!favs || favs.length === 0) {
                    throw new Error("No favorite vendors found for this user");
                }
                const { favoriteVendors: result, count: totalFavsCount } = yield userRepository_1.default.getfavVendors(favs, page, pageSize);
                return { result, totalFavsCount };
            }
            catch (error) {
                console.error("Error in FavoriteVendor:", error);
                throw new customError_1.CustomError("Failed to update favorite vendors.", 500);
            }
        });
    }
    deleteFromFavorite(userId, vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield userRepository_1.default.deletefavVendor(userId, vendorId);
                return data;
            }
            catch (error) {
                console.error("Error in FavoriteVendors:", error);
                throw new customError_1.CustomError("Failed to retrieve favorite vendors.", 500);
            }
        });
    }
}
exports.default = new UserService();
