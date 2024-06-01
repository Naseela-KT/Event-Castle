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
const bookingService_1 = __importDefault(require("../services/bookingService"));
const customError_1 = require("../error/customError");
const handleError_1 = require("../utils/handleError");
class BookingController {
    bookAnEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorId = req.query.vendorId;
                const userId = req.query.userId;
                const eventName = req.body.eventName;
                const name = req.body.name;
                const city = req.body.city;
                const date = req.body.date;
                const pin = parseInt(req.body.pin);
                const mobile = parseInt(req.body.mobile);
                const DateAlreadyBooked = yield bookingService_1.default.checkIfDatePresent(vendorId, date);
                if (DateAlreadyBooked) {
                    throw new customError_1.CustomError("Sorry this date is not available!", 404);
                }
                else {
                    try {
                        yield bookingService_1.default.acquireLockForDate(vendorId, date);
                        const booking = yield bookingService_1.default.addABooking(eventName, name, city, date, pin, mobile, vendorId, userId);
                        yield bookingService_1.default.releaseLockForDate(vendorId, date);
                        res
                            .status(201)
                            .json({ booking: booking, message: "Booking done Successfully" });
                    }
                    catch (error) {
                        console.error("Error acquiring lock:", error);
                        res
                            .status(400)
                            .json({ message: "Sorry, this date is currently not available." });
                    }
                }
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "bookAnEvent");
            }
        });
    }
    getBookingsByVendor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorId = req.query.vendorId;
                const page = parseInt(req.query.page) || 1;
                const pageSize = parseInt(req.query.pageSize) || 8;
                const { bookings, totalBookings } = yield bookingService_1.default.getAllBookingsByVendor(vendorId, page, pageSize);
                const totalPages = Math.ceil(totalBookings / pageSize);
                res.status(201).json({ bookings, totalPages: totalPages });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getBookingsByVendor");
            }
        });
    }
    getRefundDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const page = parseInt(req.query.page) || 1;
                const pageSize = parseInt(req.query.pageSize) || 4;
                const { refund, totalRefund } = yield bookingService_1.default.getAllRefunds(userId, page, pageSize);
                const totalPages = Math.ceil(totalRefund / pageSize);
                res.status(201).json({ transaction: refund, totalPages: totalPages });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getRefundDetails");
            }
        });
    }
    getBookingsByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const page = parseInt(req.query.page) || 1;
                const pageSize = parseInt(req.query.pageSize) || 6;
                const { bookings, totalBookings } = yield bookingService_1.default.getAllBookingsByUser(userId, page, pageSize);
                const totalPages = Math.ceil(totalBookings / pageSize);
                res.status(201).json({ bookings, totalPages: totalPages });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getBookingsByUser");
            }
        });
    }
    getBookingsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = req.query.bookingId;
                const bookings = yield bookingService_1.default.getAllBookingsById(bookingId);
                res.status(201).json({ bookings });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getBookingsById");
            }
        });
    }
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = req.query.bookingId;
                const status = req.body.status;
                const bookings = yield bookingService_1.default.updateStatusById(bookingId, status);
                res.status(201).json({ bookings });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "updateStatus");
            }
        });
    }
    cancelBookingByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = req.query.bookingId;
                const status = "Cancelled";
                const bookings = yield bookingService_1.default.updateStatusById(bookingId, status);
                res.status(201).json({ bookings });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "cancelBookingByUser");
            }
        });
    }
}
exports.default = new BookingController();
