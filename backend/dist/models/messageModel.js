"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    conversationId: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    imageName: {
        type: String
    },
    imageUrl: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedIds: [{
            type: String
        }],
    emoji: {
        type: String
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Message', messageSchema);
