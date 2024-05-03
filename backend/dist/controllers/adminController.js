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
const adminService_1 = __importDefault(require("../services/adminService"));
const dotenv_1 = __importDefault(require("dotenv"));
const moment_1 = __importDefault(require("moment"));
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
const adminService_2 = __importDefault(require("../services/adminService"));
const handleError_1 = require("../utils/handleError");
dotenv_1.default.config();
function getCurrentWeekRange() {
    const startOfWeek = (0, moment_1.default)().startOf("isoWeek").toDate();
    const endOfWeek = (0, moment_1.default)().endOf("isoWeek").toDate();
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
class AdminController {
    Adminlogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({ message: "Email and password are required." });
                }
                const { refreshToken, token, adminData, message } = yield adminService_1.default.login(email, password);
                res.cookie("jwtToken", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                });
                res.status(200).json({ refreshToken, token, adminData, message });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "Adminlogin");
            }
        });
    }
    getCounts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield adminService_2.default.findUsersCount();
                const vendors = yield adminService_2.default.findVendorsCount();
                const booking = yield adminService_2.default.findBookingCount();
                res.status(200).json({ users, vendors, booking });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getCounts");
            }
        });
    }
    Adminlogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("jwtToken");
                res.status(200).json({ message: "admin logged out successfully.." });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "Adminlogout");
            }
        });
    }
    getAdminData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { adminId } = req.query;
                if (!adminId) {
                    return res.status(400).json({ message: "Admin ID is required." });
                }
                const adminData = yield adminService_1.default.getDatas(adminId);
                if (!adminData) {
                    return res
                        .status(404)
                        .json({ message: `No admin found with ID: ${adminId}` });
                }
                res.status(200).json({ adminData });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getAdminData");
            }
        });
    }
    createRefreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.body;
                const token = yield adminService_1.default.createRefreshTokenAdmin(refreshToken);
                res.status(200).json({ token });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "createRefreshToken");
            }
        });
    }
    getRevenue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dateType = req.query.date;
                let start, end, groupBy, sortField, arrayLength = 0;
                switch (dateType) {
                    case "week":
                        const { startOfWeek, endOfWeek } = getCurrentWeekRange();
                        start = startOfWeek;
                        end = endOfWeek;
                        groupBy = { day: { $dayOfMonth: "$createdAt" } }; // Group by day
                        sortField = "day"; // Sort by day
                        arrayLength = 7;
                        break;
                    case "month":
                        const { startOfYear, endOfYear } = getCurrentYearRange();
                        start = startOfYear;
                        end = endOfYear;
                        groupBy = { month: { $month: "$createdAt" } }; // Group by month
                        sortField = "month"; // Sort by month
                        arrayLength = 12;
                        break;
                    case "year":
                        const { startOfFiveYearsAgo, endOfCurrentYear } = getLastFiveYearsRange();
                        start = startOfFiveYearsAgo;
                        end = endOfCurrentYear;
                        groupBy = { year: { $year: "$createdAt" } }; // Group by year
                        sortField = "year"; // Sort by year
                        arrayLength = 5;
                        break;
                    default:
                        res.status(400).json({ message: "Invalid date parameter" });
                        return;
                }
                const revenueData = yield paymentModel_1.default.aggregate([
                    {
                        $match: {
                            createdAt: {
                                $gte: start,
                                $lt: end,
                            },
                        },
                    },
                    {
                        $group: {
                            _id: groupBy,
                            totalRevenue: { $sum: "$amount" },
                        },
                    },
                    {
                        $sort: { [`_id.${sortField}`]: 1 },
                    },
                ]);
                const revenueArray = Array.from({ length: arrayLength }, (_, index) => {
                    const item = revenueData.find((r) => {
                        if (dateType === "week") {
                            return r._id.day === index + 1;
                        }
                        else if (dateType === "month") {
                            return r._id.month === index + 1;
                        }
                        else if (dateType === "year") {
                            return (r._id.year ===
                                new Date().getFullYear() - (arrayLength - 1) + index);
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
exports.default = new AdminController();
