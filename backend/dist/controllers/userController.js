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
const userService_1 = __importDefault(require("../services/userService"));
const generateOtp_1 = __importDefault(require("../utils/generateOtp"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sharp_1 = __importDefault(require("sharp"));
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const customError_1 = require("../error/customError");
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
class UserController {
    UserSignup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, name, phone } = req.body;
                const otpCode = yield (0, generateOtp_1.default)(email);
                if (otpCode !== undefined) {
                    req.session.user = {
                        email: email,
                        password: password,
                        name: name,
                        phone: parseInt(phone),
                        otpCode: otpCode,
                        otpSetTimestamp: Date.now(),
                    };
                    console.log("signup..Before");
                    console.log(req.session);
                    res.status(200).json({
                        message: "OTP send to email for verification..",
                        email: email,
                    });
                }
                else {
                    console.log("couldn't generate otp, error occcured ,please fix !!");
                    res.status(500).json({
                        message: `Server Error couldn't generate otp, error occcured ,please fix !!`,
                    });
                }
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "UserSignup");
            }
        });
    }
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("signup..After");
                console.log(req.session);
                const otp = req.body.otp;
                const userData = req.session.user;
                const email = userData.email;
                const password = userData.password;
                const name = userData.name;
                const phone = userData.phone;
                if (!userData.otpCode) {
                    throw new customError_1.CustomError("OTP Expired...Try to resend OTP !!", 400);
                }
                const otpCode = userData.otpCode;
                if (otp === otpCode) {
                    const user = yield userService_1.default.signup(email, password, name, phone, res);
                    res.status(201).json(user);
                }
                else {
                    throw new customError_1.CustomError("Invalid otp !!", 400);
                }
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "verifyOtp");
            }
        });
    }
    UserLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { token, refreshToken, userData, message } = yield userService_1.default.login(email, password);
                res.cookie("jwtToken", token, { httpOnly: true });
                res.status(200).json({ token, userData, message, refreshToken });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "UserLogin");
            }
        });
    }
    createRefreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.body;
                const token = yield userService_1.default.createRefreshToken(refreshToken);
                res.status(200).json({ token });
            }
            catch (error) {
                console.error('Error refreshing token:', error);
                res.status(401).json({ message: 'Failed to refresh token' });
            }
        });
    }
    UserLogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie("jwtUser", "", { maxAge: 0 });
                res.status(200).json({ message: "User logged out successfully" });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "UserLogout");
            }
        });
    }
    allUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, limit = 6, search = "" } = req.query;
                const pageNumber = parseInt(page, 10);
                const limitNumber = parseInt(limit, 10);
                const users = yield userService_1.default.getUsers(pageNumber, limitNumber, search.toString());
                const totalUsers = yield userService_1.default.getUsersCount();
                res.status(200).json({ users, totalUsers });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "allUsers");
            }
        });
    }
    Toggleblock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                if (!userId) {
                    res.status(400).json({ message: "User ID is missing or invalid." });
                    return;
                }
                yield userService_1.default.toggleUserBlock(userId);
                let process = yield userModel_1.default.findOne({ _id: userId });
                res.status(200).json({
                    message: "User block status toggled successfully.",
                    process: !(process === null || process === void 0 ? void 0 : process.isActive) ? "block" : "unblock",
                });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "Toggleblock");
            }
        });
    }
    UserForgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                console.log(email);
                const user = yield userService_1.default.CheckExistingUSer(email);
                if (user) {
                    const otp = yield userService_1.default.generateOtpForPassword(email);
                    req.session.otp = {
                        otp: otp,
                        email: email,
                        otpSetTimestamp: Date.now(),
                    };
                    console.log(req.session.otp);
                    res.status(200).json({
                        message: "OTP sent to email for password updation request ",
                        email,
                    });
                }
                else {
                    res.status(400).json({ error: "User not found !!" });
                }
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "UserForgotPassword");
            }
        });
    }
    VerifyOtpForPassword(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ReceivedOtp = req.body.otp;
                const generatedOtp = (_a = req.session.otp) === null || _a === void 0 ? void 0 : _a.otp;
                if (!req.session.otp) {
                    throw new customError_1.CustomError("OTP Expired...Try to resend OTP !!", 400);
                }
                if (ReceivedOtp === generatedOtp) {
                    console.log("otp is correct , navigating user to update password.");
                    res.status(200).json({ message: "Otp is verified..!" });
                }
                else {
                    throw new customError_1.CustomError("Invalid OTP !!", 400);
                }
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "VerifyOtpForPassword");
            }
        });
    }
    ResetUserPassword(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const password = req.body.password;
                const confirmPassword = req.body.confirm_password;
                if (password === confirmPassword) {
                    const email = (_a = req.session.otp) === null || _a === void 0 ? void 0 : _a.email;
                    console.log("email " + email);
                    const status = yield userService_1.default.ResetPassword(password, email);
                    req.session.otp = undefined;
                    res.status(200).json({ message: "Password reset successfully." });
                }
                else {
                    res.status(400).json({ error: "Passwords do not match." });
                }
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "ResetUserPassword");
            }
        });
    }
    ResendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.session.user;
                if (!userData) {
                    res
                        .status(400)
                        .json({ error: "Session data not found. Please sign up again." });
                    return;
                }
                const email = userData.email;
                const newOtp = yield (0, generateOtp_1.default)(email);
                if (req.session.user) {
                    req.session.user.otpCode = newOtp;
                }
                else {
                    console.error("Session user data is unexpectedly undefined.");
                    res.status(500).json({
                        message: "Server Error: Session user data is unexpectedly undefined.",
                    });
                    return;
                }
                res.status(200).json({ message: "New OTP sent to email" });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "ResendOtp");
            }
        });
    }
    PwdResendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otp = req.session.otp;
                if (!otp) {
                    res
                        .status(400)
                        .json({ error: "Session data not found. Please sign up again." });
                    return;
                }
                const email = otp.email;
                const newOtp = yield (0, generateOtp_1.default)(email);
                if (req.session.otp) {
                    req.session.otp.otp = newOtp;
                }
                else {
                    console.error("Session user data is unexpectedly undefined.");
                    res.status(500).json({
                        message: "Server Error: Session user data is unexpectedly undefined.",
                    });
                    return;
                }
                res.status(200).json({ message: "New OTP sent to email" });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "PwdResendOtp");
            }
        });
    }
    googleRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("This is credential in body: ", req.body.credential);
                const token = req.body.credential;
                console.log(token);
                const decodedData = jsonwebtoken_1.default.decode(req.body.credential);
                console.log("Decoded data: ", decodedData);
                const { name, email, jti } = decodedData;
                const user = yield userService_1.default.googleSignup(email, jti, name);
                if (user) {
                    res.status(200).json({ message: "user saved successfully" });
                }
            }
            catch (error) {
                res.status(400).json({ error: "User already exists" });
            }
        });
    }
    googleLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedData = jsonwebtoken_1.default.decode(req.body.credential);
                console.log(decodedData);
                if (!decodedData) {
                    return res.status(400).json({ error: "Invalid credentials" });
                }
                const { email, jti } = decodedData;
                const password = jti;
                const { refreshToken, token, userData, message } = yield userService_1.default.gLogin(email, password);
                req.session.user = userData._id;
                res.cookie("jwtToken", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                });
                res.status(200).json({ refreshToken, token, userData, message });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "googleLogin");
            }
        });
    }
    updatePasswordController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const currentPassword = req.body.current_password;
                const newPassword = req.body.new_password;
                const userId = req.query.userid;
                let status = yield userService_1.default.checkCurrentPassword(currentPassword, userId);
                if (!status) {
                    throw new customError_1.CustomError(`Current password is wrong!`, 400);
                }
                const data = yield userService_1.default.UpdatePasswordService(newPassword, userId);
                if (!data) {
                    res
                        .status(400)
                        .json({ error: "couldn't update password..internal error." });
                }
                res.status(200).json({ message: "password updated successfully.." });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "updatePasswordController");
            }
        });
    }
    updateProfile(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.body.name;
                const phone = parseInt(req.body.phone);
                const userId = req.query.userid;
                console.log(userId);
                let imageName = "";
                let imageUrl = "";
                if (req.file) {
                    const buffer = yield (0, sharp_1.default)((_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer)
                        .resize({ height: 1200, width: 1200, fit: "contain" })
                        .toBuffer();
                    imageName = randomImage();
                    const params = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: imageName,
                        Body: buffer,
                        ContentType: (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype,
                    };
                    const command2 = new client_s3_1.PutObjectCommand(params);
                    yield s3.send(command2);
                    const getObjectParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: imageName
                    };
                    const command = new client_s3_1.GetObjectCommand(getObjectParams);
                    imageUrl = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, {});
                }
                const user = yield userService_1.default.updateProfileService(name, phone, imageName, userId, imageUrl);
                res.status(201).json(user);
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "updateProfile");
            }
        });
    }
    AddFavVendor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorId = req.query.vendorId;
                const userId = req.query.userId;
                if (!vendorId) {
                    res.status(400).json({ error: "Invalid vendor id." });
                }
                if (!userId) {
                    res.status(400).json({ error: "Invalid user id." });
                }
                const data = yield userService_1.default.FavoriteVendor(vendorId, userId);
                const userData = yield userService_1.default.findUser(userId);
                if (data) {
                    res.status(200).json({ message: "vendor added to Favorite list..", fav: true, userData });
                }
                else {
                    res.status(200).json({ message: "vendor removed from favorites", fav: false, userData });
                }
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "AddFavVendor");
            }
        });
    }
    getFavoriteVendors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userid;
                const page = parseInt(req.query.page) || 1;
                const pageSize = parseInt(req.query.pageSize) || 8;
                if (!userId) {
                    res.status(400).json({ error: "Invalid user id." });
                }
                const { result, totalFavsCount } = yield userService_1.default.FavoriteVendors(userId, page, pageSize);
                const totalPages = Math.ceil(totalFavsCount / pageSize);
                if (result) {
                    res.status(200).json({ data: result, totalPages: totalPages });
                }
                else {
                    res.status(400).json({ message: "No vendors in favorites." });
                }
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getFavoriteVendors");
            }
        });
    }
    deleteFavoriteVendor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorId = req.query.vendorId;
                const userId = req.query.userId;
                if (!userId) {
                    res.status(400).json({ error: "Invalid user id." });
                }
                const result = yield userService_1.default.deleteFromFavorite(userId, vendorId);
                if (result) {
                    res.status(200).json({ userData: result });
                }
                else {
                    res.status(400).json({ message: "No vendors in favorites." });
                }
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "deleteFavoriteVendor");
            }
        });
    }
    getUsersForSidebar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filteredUsers = yield userModel_1.default.find({}).select("-password");
                res.status(200).json(filteredUsers);
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getUsersForSidebar");
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const data = yield userService_1.default.findUser(userId);
                res.status(200).json(data);
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getUser");
            }
        });
    }
    sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, mobile, subject, message } = req.body;
                const data = yield userService_1.default.sendEmail(name, email, mobile, subject, message);
                res.status(200).json(data);
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "sendMessage");
            }
        });
    }
}
exports.default = new UserController();
