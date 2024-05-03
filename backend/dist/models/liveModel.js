"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const liveSchema = new mongoose_1.Schema({
    url: {
        type: String,
        required: true
    },
    finished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Live', liveSchema);
