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
const paymentRepository_1 = __importDefault(require("../repositories/paymentRepository"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
const notificationModel_1 = __importStar(require("../models/notificationModel"));
const customError_1 = require("../error/customError");
class PaymentService {
    addNewPayment(amount, userId, vendorId, bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingIdObjectId = new mongoose_1.default.Types.ObjectId(bookingId);
                const vendorIdObjectId = new mongoose_1.default.Types.ObjectId(vendorId);
                const userIdObjectId = new mongoose_1.default.Types.ObjectId(userId);
                const existingPayment = yield paymentRepository_1.default.findOne({ bookingId: bookingId });
                console.log(existingPayment);
                if (existingPayment) {
                    return existingPayment;
                }
                const bookingData = yield paymentRepository_1.default.create({
                    amount,
                    userId: userIdObjectId,
                    vendorId: vendorIdObjectId,
                    bookingId: bookingIdObjectId,
                });
                yield bookingModel_1.default.findByIdAndUpdate(bookingId, { $set: { payment_status: "Completed" } });
                const vendorNotification = new notificationModel_1.default({
                    recipient: vendorId,
                    message: "Payment completed!",
                    type: notificationModel_1.NOTIFICATION_TYPES.PAYMENT
                });
                yield vendorNotification.save();
                let AdminData = yield adminModel_1.default.findOne({});
                if (AdminData !== null && amount !== undefined) {
                    AdminData.wallet += amount;
                    yield AdminData.save();
                }
                const adminNotification = new notificationModel_1.default({
                    recipient: AdminData === null || AdminData === void 0 ? void 0 : AdminData._id,
                    message: `${amount} got credited to wallet`,
                    type: notificationModel_1.NOTIFICATION_TYPES.WALLET
                });
                yield adminNotification.save();
                return bookingData;
            }
            catch (error) {
                console.error("Error in addNewPayment:", error);
                throw new customError_1.CustomError("Failed to add new payment.", 500);
            }
        });
    }
    getPayments(page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield paymentRepository_1.default.findAllPayments(page, pageSize);
            }
            catch (error) {
                console.error("Error in getPayments:", error);
                throw new customError_1.CustomError("Failed to retrieve payments.", 500);
            }
        });
    }
}
exports.default = new PaymentService();
