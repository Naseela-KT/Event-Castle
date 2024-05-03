"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFICATION_TYPES = void 0;
const mongoose_1 = require("mongoose");
exports.NOTIFICATION_TYPES = {
    BOOKING: "BOOKING",
    STATUS: "STATUS",
    PAYMENT: "PAYMENT",
    WALLET: "WALLET",
    REVIEW: "REVIEW",
    NEW_USER: "NEW_USER",
    NEW_VENDOR: "NEW_VENDOR"
};
const notificationSchema = new mongoose_1.Schema({
    recipient: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(exports.NOTIFICATION_TYPES),
    },
    createdAt: {
        type: Date
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Notification", notificationSchema);
