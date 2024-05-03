"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const customError_1 = require("../error/customError");
function handleError(res, error, contextMessage) {
    if (error instanceof customError_1.CustomError) {
        res.status(error.statusCode).json({ message: error.message });
    }
    else {
        console.error(`Unexpected error in ${contextMessage}:`, error);
        res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
}
exports.handleError = handleError;
