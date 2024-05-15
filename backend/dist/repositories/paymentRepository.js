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
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
const baseRepository_1 = require("./baseRepository");
class PaymentRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(paymentModel_1.default);
    }
    findAllPayments(page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * pageSize;
            const payment = yield paymentModel_1.default.find()
                .populate("userId")
                .populate("vendorId")
                .populate("bookingId")
                .sort({
                createdAt: -1,
            })
                .skip(skip)
                .limit(pageSize);
            const count = yield paymentModel_1.default.countDocuments({});
            return { payment, count };
        });
    }
}
exports.default = new PaymentRepository();
