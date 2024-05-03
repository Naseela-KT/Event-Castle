"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importDefault(require("mongoose"));
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
const bookingRepository_1 = __importDefault(require("../repositories/bookingRepository"));
const vendorModel_1 = __importDefault(require("../models/vendorModel"));
const notificationModel_1 = __importStar(require("../models/notificationModel"));
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const customError_1 = require("../error/customError");
class BookingService {
    checkIfDatePresent(vendorId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorData = yield vendorModel_1.default.findById(vendorId);
                if (!vendorData) {
                    throw new Error("Vendor not found");
                }
                const isBooked = vendorData.bookedDates.includes(date);
                return isBooked ? true : false;
            }
            catch (error) {
                console.error("Error checking dates:", error);
                throw new customError_1.CustomError("Error checking dates", 500);
            }
        });
    }
    acquireLockForDate(vendorId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorData = yield vendorModel_1.default.findById(vendorId);
                if (!vendorData) {
                    throw new customError_1.CustomError("Vendor not found", 404);
                }
                const existingLock = vendorData.locks.find((lock) => lock.date === date);
                if (existingLock && existingLock.isLocked) {
                    throw new Error("Date is already locked");
                }
                vendorData.locks.push({
                    date: date,
                    isLocked: true,
                });
                yield vendorData.save();
            }
            catch (error) {
                console.error("Error aquiring locks:", error);
                throw new customError_1.CustomError("Error aquiring locks", 500);
            }
        });
    }
    releaseLockForDate(vendorId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorData = yield vendorModel_1.default.findById(vendorId);
                if (!vendorData) {
                    throw new customError_1.CustomError("Vendor not found", 404);
                }
                const lockIndex = vendorData.locks.findIndex((lock) => lock.date === date);
                if (lockIndex !== -1) {
                    vendorData.locks.splice(lockIndex, 1);
                    yield vendorData.save();
                }
            }
            catch (error) {
                console.error("Error releasing lock for dates:", error);
                throw new customError_1.CustomError("Unable to release lock for dates", 500);
            }
        });
    }
    addABooking(eventName, name, city, date, pin, mobile, vendorId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorIdObjectId = new mongoose_1.default.Types.ObjectId(vendorId);
                const userIdObjectId = new mongoose_1.default.Types.ObjectId(userId);
                const booking = yield bookingRepository_1.default.create({
                    eventName,
                    name,
                    city,
                    date,
                    pin,
                    mobile,
                    vendorId: vendorIdObjectId,
                    userId: userIdObjectId,
                });
                yield vendorModel_1.default.findByIdAndUpdate(vendorId, {
                    $push: { bookedDates: date },
                });
                const newNotification = new notificationModel_1.default({
                    recipient: vendorId,
                    message: "New event Booked!",
                    type: notificationModel_1.NOTIFICATION_TYPES.BOOKING
                });
                yield newNotification.save();
                return booking;
            }
            catch (error) {
                console.error("Error creating a booking:", error);
                throw new customError_1.CustomError("Unable to create booking", 500);
            }
        });
    }
    getAllBookingsByVendor(vendorId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bookings, totalBookings } = yield bookingRepository_1.default.findBookingsByVendorId(vendorId, page, pageSize);
                return { bookings, totalBookings };
            }
            catch (error) {
                console.error("Error fetching booking for vendor:", error);
                throw new customError_1.CustomError("Unable fetch vendor booking", 500);
            }
        });
    }
    getAllRefunds(userId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refund, totalRefund } = yield bookingRepository_1.default.findRefundForUser(userId, page, pageSize);
                return { refund, totalRefund };
            }
            catch (error) {
                console.error("Error fetching booking for vendor:", error);
                throw new customError_1.CustomError("Unable fetch vendor booking", 500);
            }
        });
    }
    getAllBookingsByUser(userId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bookings, totalBookings } = yield bookingRepository_1.default.findBookingsByUserId(userId, page, pageSize);
                return { bookings, totalBookings };
            }
            catch (error) {
                console.error("Error fetching booking for user:", error);
                throw new customError_1.CustomError("Unable fetch user booking", 500);
            }
        });
    }
    getAllBookingsById(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield bookingRepository_1.default.findBookingsByBookingId(bookingId);
                return bookings;
            }
            catch (error) {
                console.error("Error fetching bookings:", error);
                throw new customError_1.CustomError("Unable fetch bookings", 500);
            }
        });
    }
    updateStatusById(bookingId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = yield bookingRepository_1.default.getById(bookingId);
                if (!booking) {
                    throw new Error("Booking not found");
                }
                if (status === "Rejected" || status === "Cancelled") {
                    const { vendorId, date } = booking;
                    yield vendorModel_1.default.findByIdAndUpdate(vendorId, {
                        $pull: { bookedDates: date },
                    });
                    const Payment = yield paymentModel_1.default.findOne({ bookingId: bookingId });
                    const newNotification = new notificationModel_1.default({
                        recipient: booking.userId,
                        message: "Booking is rejected By Vendor",
                        type: notificationModel_1.NOTIFICATION_TYPES.STATUS
                    });
                    yield newNotification.save();
                    if (status == "Cancelled" && Payment) {
                        const { userId } = booking;
                        const User = yield userModel_1.default.findById(userId);
                        const Admin = yield adminModel_1.default.findOne();
                        if (!User || !Admin) {
                            throw new Error("User or admin not found");
                        }
                        User.wallet += 500;
                        yield User.save();
                        Admin.wallet -= 500;
                        yield Admin.save();
                        booking.refundAmount += 500;
                        yield booking.save();
                        const newNotification = new notificationModel_1.default({
                            recipient: booking.vendorId,
                            message: "Booking Cancelled by user",
                            type: notificationModel_1.NOTIFICATION_TYPES.STATUS
                        });
                        yield newNotification.save();
                    }
                }
                const result = yield bookingModel_1.default.findByIdAndUpdate(bookingId, {
                    $set: { status: status }
                });
                yield vendorModel_1.default.findByIdAndUpdate(booking.vendorId, { $inc: { totalBooking: 1 } });
                const newNotification = new notificationModel_1.default({
                    recipient: booking.userId,
                    message: "Booking Accepted by vendor",
                    type: notificationModel_1.NOTIFICATION_TYPES.STATUS
                });
                yield newNotification.save();
                return result;
            }
            catch (error) {
                console.error("Error updating status:", error);
                throw new customError_1.CustomError("Unable to update booking status", 500);
            }
        });
    }
}
exports.default = new BookingService();
