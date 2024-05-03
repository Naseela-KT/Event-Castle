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
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
const baseRepository_1 = require("./baseRepository");
class BookingRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(bookingModel_1.default);
    }
    findBookingsByVendorId(vendorId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skip = (page - 1) * pageSize;
                const bookings = yield bookingModel_1.default.find({ vendorId: vendorId }).sort({ createdAt: -1 }).skip(skip).limit(pageSize).exec();
                const totalBookings = yield bookingModel_1.default.countDocuments({ vendorId: vendorId });
                return { bookings, totalBookings };
            }
            catch (error) {
                console.error("Error in findBookingsByVendorId:", error);
                throw new customError_1.CustomError("Failed to find bookings by vendor ID.", 500);
            }
        });
    }
    findRefundForUser(userId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skip = (page - 1) * pageSize;
                const bookings = yield bookingModel_1.default.find({ userId: userId, refundAmount: { $ne: 0 } }) // Filtering where refundAmount is not equal to "0"
                    .skip(skip)
                    .limit(pageSize)
                    .exec();
                const totalBookings = yield bookingModel_1.default.countDocuments({ userId: userId, refundAmount: { $ne: 0 } });
                return { refund: bookings, totalRefund: totalBookings };
            }
            catch (error) {
                console.error("Error in findRefundForUser:", error);
                throw new customError_1.CustomError("Failed to find refunds for user.", 500);
            }
        });
    }
    findBookingsByUserId(userId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skip = (page - 1) * pageSize;
                const bookings = yield bookingModel_1.default.find({ userId: userId }).sort({ createdAt: -1 }).skip(skip).limit(pageSize).exec();
                const totalBookings = yield bookingModel_1.default.countDocuments({ userId: userId });
                return { bookings, totalBookings };
            }
            catch (error) {
                console.error("Error in findBookingsByUserId:", error);
                throw new customError_1.CustomError("Failed to find bookings by user ID.", 500);
            }
        });
    }
    findBookingsByBookingId(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield bookingModel_1.default.find({ _id: bookingId })
                    .populate("userId")
                    .populate("vendorId");
                return result;
            }
            catch (error) {
                console.error("Error in findBookingsByBookingId:", error);
                throw new customError_1.CustomError("Failed to find booking by ID.", 500);
            }
        });
    }
}
exports.default = new BookingRepository();
