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
const moment_1 = __importDefault(require("moment"));
const vendorService_1 = __importDefault(require("../services/vendorService"));
const generateOtp_1 = __importDefault(require("../utils/generateOtp"));
const vendorModel_1 = __importDefault(require("../models/vendorModel"));
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const customError_1 = require("../error/customError");
const mongoose_1 = require("mongoose");
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
const handleError_1 = require("../utils/handleError");
dotenv_1.default.config();
const s3 = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    region: process.env.BUCKET_REGION,
});
function getCurrentWeekRange() {
    const startOfWeek = (0, moment_1.default)().startOf('isoWeek').toDate();
    const endOfWeek = (0, moment_1.default)().endOf('isoWeek').toDate();
    return { startOfWeek, endOfWeek };
}
// Function to get current year range
function getCurrentYearRange() {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const endOfYear = new Date(new Date().getFullYear() + 1, 0, 1);
    return { startOfYear, endOfYear };
}
// Function to calculate the last five years' range
function getLastFiveYearsRange() {
    const currentYear = new Date().getFullYear();
    const startOfFiveYearsAgo = new Date(currentYear - 5, 0, 1);
    const endOfCurrentYear = new Date(currentYear + 1, 0, 1);
    return { startOfFiveYearsAgo, endOfCurrentYear };
}
class VendorController {
    vendorSignup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, name, phone, city, vendor_type } = req.body;
                const otpCode = yield (0, generateOtp_1.default)(email);
                if (otpCode !== undefined) {
                    req.session.vendorData = {
                        email: email,
                        password: password,
                        name: name,
                        phone: parseInt(phone),
                        city: city,
                        otpCode: otpCode,
                        vendor_type: vendor_type,
                        otpSetTimestamp: Date.now(),
                    };
                    console.log("vendor signup..Before");
                    console.log(req.session);
                    res.status(200).json({
                        message: "OTP send to vendor's email for verification..",
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
                (0, handleError_1.handleError)(res, error, "vendorSignup");
            }
        });
    }
    createRefreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.body;
                const token = yield vendorService_1.default.createRefreshToken(refreshToken);
                res.status(200).json({ token });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "createRefreshToken");
            }
        });
    }
    ResendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorData = req.session.vendorData;
                if (!vendorData) {
                    res
                        .status(400)
                        .json({ error: "Session data not found. Please sign up again." });
                    return;
                }
                const email = vendorData.email;
                const newOtp = yield (0, generateOtp_1.default)(email);
                if (req.session.vendorData) {
                    req.session.vendorData.otpCode = newOtp;
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
    VendorLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { refreshToken, token, vendorData, message } = yield vendorService_1.default.login(email, password);
                res.cookie("jwtToken", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                });
                res.status(200).json({ token, vendorData, message });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "VendorLogin");
            }
        });
    }
    VendorLogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("jwtToken");
                res.status(200).json({ message: "vendor logged out successfully" });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "VendorLogout");
            }
        });
    }
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otp = req.body.otp;
                const vendorData = req.session.vendorData;
                const email = vendorData.email;
                const password = vendorData.password;
                const name = vendorData.name;
                const phone = vendorData.phone;
                const city = vendorData.city;
                const vendor_type = vendorData.vendor_type;
                const otpCode = vendorData.otpCode;
                if (!vendorData.otpCode) {
                    throw new customError_1.CustomError("OTP Expired...Try to resend OTP !!", 400);
                }
                if (otp === otpCode) {
                    const vendor = yield vendorService_1.default.signup(email, password, name, phone, city, vendor_type);
                    res.status(201).json({ vendor: vendor });
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
    VendorForgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const vendor = yield vendorService_1.default.CheckExistingVendor(email);
                if (vendor) {
                    const otp = yield (0, generateOtp_1.default)(email);
                    req.session.vendorotp = { otp: otp, email: email };
                    console.log(req.session);
                    res.status(200).json({
                        message: "otp sent to vendor email for password updation request ",
                        email: email,
                    });
                }
                else {
                    res.status(400).json({ error: "Email not Registered with us !!" });
                }
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "VendorForgotPassword");
            }
        });
    }
    VerifyOtpForPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ReceivedOtp = req.body.otp;
                console.log("received otp", ReceivedOtp);
                console.log(req.session);
                const generatedOtp = req.session.vendorotp.otp;
                console.log("generated otp", generateOtp_1.default);
                if (ReceivedOtp === generatedOtp) {
                    console.log("otp is correct , navigating vendor to update password.");
                    res
                        .status(200)
                        .json({ message: "otp is correct, please update password now" });
                }
                else {
                    res.status(400).json({ Error: `otp's didn't matched..` });
                }
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "VerifyOtpForPassword");
            }
        });
    }
    getAllVendors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, limit = 8, search = "", category = '', location = '', sort } = req.query;
                console.log(req.query);
                const pageNumber = parseInt(page, 10);
                const limitNumber = parseInt(limit, 10);
                const sortValue = parseInt(sort, 10);
                const vendorData = yield vendorService_1.default.getVendors(pageNumber, limitNumber, search.toString(), category.toString(), location.toString(), sortValue);
                const totalVendors = yield vendorService_1.default.getVendorsCount();
                const totalPages = Math.ceil(totalVendors / limitNumber);
                res.status(200).json({ vendorData, totalPages });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getAllVendors");
            }
        });
    }
    Toggleblock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const VendorId = req.query.VendorId;
                if (!VendorId) {
                    throw new Error("Vendor ID is missing or invalid.");
                }
                yield vendorService_1.default.toggleVendorBlock(VendorId);
                let process = yield vendorModel_1.default.findOne({ _id: VendorId });
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
    getVendor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorId = req.query.vendorid; // or req.query.Id?.toString()
                if (!vendorId) {
                    res.status(400).json({ error: "Vendor ID is required." });
                    return;
                }
                const data = yield vendorService_1.default.getSingleVendor(vendorId);
                if (!data) {
                    res.status(400).json({ error: "Vendor not found , error occured" });
                }
                else {
                    res.status(200).json({ data: data });
                }
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getVendor");
            }
        });
    }
    ResetVendorPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const password = req.body.password;
                const confirmPassword = req.body.confirm_password;
                if (password === confirmPassword) {
                    const email = req.session.vendorotp.email;
                    const status = yield vendorService_1.default.ResetVendorPasswordService(password, email);
                    res.status(200).json({ message: "Password reset successfully." });
                }
                else {
                    res.status(400).json({ error: "Passwords do not match." });
                }
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "ResetVendorPassword");
            }
        });
    }
    //Profile-Changepassword
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const currentPassword = req.body.current_password;
                const newPassword = req.body.new_password;
                const vendorId = req.query.vendorid;
                console.log(vendorId);
                let status = yield vendorService_1.default.checkCurrentPassword(currentPassword, vendorId);
                if (!status) {
                    throw new customError_1.CustomError(`Current password is wrong!`, 400);
                }
                const data = yield vendorService_1.default.UpdatePasswordService(newPassword, vendorId);
                if (!data) {
                    res
                        .status(400)
                        .json({ error: "couldn't update password..internal error." });
                }
                res.status(200).json({ message: "password updated successfully.." });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "updatePassword");
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorId = req.query.vendorid; // Assuming vendorId is sent in the request body
                const formData = req.body;
                let coverpicFile, coverpicUrl;
                let logoFile, logoUrl;
                if (req.files) {
                    if (typeof req.files === "object" &&
                        "coverpic" in req.files &&
                        Array.isArray(req.files["coverpic"])) {
                        coverpicFile = req.files["coverpic"][0];
                    }
                    if (typeof req.files === "object" &&
                        "logo" in req.files &&
                        Array.isArray(req.files["logo"])) {
                        logoFile = req.files["logo"][0];
                    }
                    const coverpicUploadParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: coverpicFile === null || coverpicFile === void 0 ? void 0 : coverpicFile.originalname,
                        Body: coverpicFile === null || coverpicFile === void 0 ? void 0 : coverpicFile.buffer,
                        ContentType: coverpicFile === null || coverpicFile === void 0 ? void 0 : coverpicFile.mimetype,
                    };
                    console.log(coverpicFile === null || coverpicFile === void 0 ? void 0 : coverpicFile.originalname);
                    const covercommand = new client_s3_1.PutObjectCommand(coverpicUploadParams);
                    yield s3.send(covercommand);
                    const covercommand2 = new client_s3_1.GetObjectCommand({
                        Bucket: process.env.BUCKET_NAME,
                        Key: coverpicFile === null || coverpicFile === void 0 ? void 0 : coverpicFile.originalname,
                    });
                    coverpicUrl = yield (0, s3_request_presigner_1.getSignedUrl)(s3, covercommand2, {
                        expiresIn: 86400 * 6,
                    });
                    // Upload logo to S3
                    const logoUploadParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: logoFile === null || logoFile === void 0 ? void 0 : logoFile.originalname,
                        Body: logoFile === null || logoFile === void 0 ? void 0 : logoFile.buffer,
                        ContentType: logoFile === null || logoFile === void 0 ? void 0 : logoFile.mimetype,
                    };
                    const logocommand = new client_s3_1.PutObjectCommand(logoUploadParams);
                    yield s3.send(logocommand);
                    const logocommand2 = new client_s3_1.GetObjectCommand({
                        Bucket: process.env.BUCKET_NAME,
                        Key: logoFile === null || logoFile === void 0 ? void 0 : logoFile.originalname,
                    });
                    logoUrl = yield (0, s3_request_presigner_1.getSignedUrl)(s3, logocommand2, {
                        expiresIn: 86400 * 6,
                    });
                }
                const updatedVendor = yield vendorService_1.default.updateVendor(vendorId, formData, coverpicUrl ? coverpicUrl : "", logoUrl ? logoUrl : "", (logoFile === null || logoFile === void 0 ? void 0 : logoFile.originalname) ? logoFile === null || logoFile === void 0 ? void 0 : logoFile.originalname : "", (coverpicFile === null || coverpicFile === void 0 ? void 0 : coverpicFile.originalname) ? coverpicFile === null || coverpicFile === void 0 ? void 0 : coverpicFile.originalname : "");
                res.status(200).json(updatedVendor);
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "updateProfile");
            }
        });
    }
    sendVerifyRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorId = req.body.vendorId;
                const result = yield vendorService_1.default.verificationRequest(vendorId);
                res.status(200).json(result);
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "sendVerifyRequest");
            }
        });
    }
    updateVerifyStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorId = req.body.vendorId;
                const status = req.body.status;
                const result = yield vendorService_1.default.changeVerifyStatus(vendorId, status);
                res.status(200).json({ result, message: "Status updated successfully!" });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "updateVerifyStatus");
            }
        });
    }
    addDates(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorId = req.body.vendorId;
                const status = req.body.status;
                const date = req.body.date;
                console.log(vendorId, status, date);
                const bookedDates = yield vendorService_1.default.addDateAvailability(vendorId, status, date);
                res.status(200).json({ bookedDates, message: "Date status updated!" });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "addDates");
            }
        });
    }
    loadDates(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorId = req.query.vendorId;
                const bookedDates = yield vendorService_1.default.getAllDates(vendorId);
                res.status(200).json({ bookedDates });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "loadDates");
            }
        });
    }
    getLocations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Locations = yield vendorService_1.default.getAllLocations();
                res.status(200).json({ locations: Locations });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getLocations");
            }
        });
    }
    getRevenue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorId = req.query.vendorId;
                const dateType = req.query.date;
                if (!vendorId || !mongoose_1.Types.ObjectId.isValid(vendorId)) {
                    res.status(400).json({ message: 'Invalid or missing vendorId' });
                    return;
                }
                let start, end, groupBy, sortField, arrayLength = 0;
                switch (dateType) {
                    case 'week':
                        const { startOfWeek, endOfWeek } = getCurrentWeekRange();
                        start = startOfWeek;
                        end = endOfWeek;
                        groupBy = { day: { $dayOfMonth: '$createdAt' } }; // Group by day
                        sortField = 'day'; // Sort by day
                        arrayLength = 7;
                        break;
                    case 'month':
                        const { startOfYear, endOfYear } = getCurrentYearRange();
                        start = startOfYear;
                        end = endOfYear;
                        groupBy = { month: { $month: '$createdAt' } }; // Group by month
                        sortField = 'month'; // Sort by month
                        arrayLength = 12;
                        break;
                    case 'year':
                        const { startOfFiveYearsAgo, endOfCurrentYear } = getLastFiveYearsRange();
                        start = startOfFiveYearsAgo;
                        end = endOfCurrentYear;
                        groupBy = { year: { $year: '$createdAt' } }; // Group by year
                        sortField = 'year'; // Sort by year
                        arrayLength = 5;
                        break;
                    default:
                        res.status(400).json({ message: 'Invalid date parameter' });
                        return;
                }
                const revenueData = yield paymentModel_1.default.aggregate([
                    {
                        $match: {
                            vendorId: new mongoose_1.Types.ObjectId(vendorId),
                            createdAt: {
                                $gte: start,
                                $lt: end,
                            },
                        },
                    },
                    {
                        $group: {
                            _id: groupBy,
                            totalRevenue: { $sum: '$amount' },
                        },
                    },
                    {
                        $sort: { [`_id.${sortField}`]: 1 },
                    },
                ]);
                const revenueArray = Array.from({ length: arrayLength }, (_, index) => {
                    const item = revenueData.find((r) => {
                        if (dateType === 'week') {
                            return r._id.day === index + 1;
                        }
                        else if (dateType === 'month') {
                            return r._id.month === index + 1;
                        }
                        else if (dateType === 'year') {
                            return r._id.year === new Date().getFullYear() - (arrayLength - 1) + index;
                        }
                        return false;
                    });
                    return item ? item.totalRevenue : 0; // Default to 0 if no data for the expected index
                });
                res.status(200).json({ revenue: revenueArray });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getRevenue");
            }
        });
    }
}
exports.default = new VendorController();
