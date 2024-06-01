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
const vendorModel_1 = __importDefault(require("../models/vendorModel"));
const vendorModel_2 = __importDefault(require("../models/vendorModel"));
const baseRepository_1 = require("./baseRepository");
class VendorRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(vendorModel_1.default);
    }
    findAllVendors(page, limit, search, category, location, sortValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = {};
                if (search && search.trim()) {
                    query.name = { $regex: new RegExp(search, 'i') };
                }
                if (category && category.trim()) {
                    const categories = category.split(',').map(c => c.trim());
                    query.vendor_type = { $in: categories };
                }
                if (location && location.trim()) {
                    const locations = location.split(',').map(l => l.trim());
                    query.city = { $in: locations };
                }
                const validSortValue = sortValue === 1 || sortValue === 1 ? sortValue : -1;
                const vendors = yield vendorModel_2.default.find(query).sort({ totalRating: validSortValue })
                    .skip((page - 1) * limit)
                    .limit(limit);
                console.log(vendors);
                return vendors;
            }
            catch (error) {
                throw error;
            }
        });
    }
    UpdateVendorPassword(password, mail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield vendorModel_1.default.updateOne({ email: mail }, { password: password });
                if (result.modifiedCount === 1) {
                    return { success: true, message: "Vendor Password updated successfully." };
                }
                else {
                    return { success: false, message: "Vendor not found or password not updated." };
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    UpdatePassword(password, mail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield vendorModel_1.default.updateOne({ email: mail }, { password: password });
                if (result.modifiedCount === 1) {
                    return { success: true, message: "Password updated successfully." };
                }
                else {
                    return { success: false, message: "User not found or password not updated." };
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    requestForVerification(vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield vendorModel_2.default.findByIdAndUpdate(vendorId, { $set: { verificationRequest: true } });
            return data;
        });
    }
    updateVerificationStatus(vendorId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield vendorModel_2.default.findByIdAndUpdate(vendorId, { $set: { verificationRequest: false, isVerified: status === "Accepted" } });
            return data;
        });
    }
    changeDateAvailability(vendorId, status, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Vendor = yield vendorModel_2.default.findOne({ _id: vendorId });
                let bookedDates = Vendor === null || Vendor === void 0 ? void 0 : Vendor.bookedDates;
                if (status === "Available") {
                    if (bookedDates === null || bookedDates === void 0 ? void 0 : bookedDates.includes(date)) {
                        bookedDates = bookedDates.filter((bookedDate) => bookedDate !== date);
                    }
                }
                else if (status === "Unavailable") {
                    if (!(bookedDates === null || bookedDates === void 0 ? void 0 : bookedDates.includes(date))) {
                        bookedDates === null || bookedDates === void 0 ? void 0 : bookedDates.push(date);
                    }
                }
                yield (Vendor === null || Vendor === void 0 ? void 0 : Vendor.updateOne({ bookedDates }));
                return bookedDates;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAllLocations() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield vendorModel_2.default.distinct('city');
        });
    }
}
exports.default = new VendorRepository();
