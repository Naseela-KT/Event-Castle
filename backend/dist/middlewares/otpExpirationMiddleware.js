"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorOtpExpiration = exports.userEmailVerifyOtp = exports.userOtpExpiration = void 0;
const userOtpExpiration = (req, res, next) => {
    const now = Date.now();
    if (req.session.user && req.session.user.otpCode && req.session.user.otpSetTimestamp) {
        const timeElapsed = now - req.session.user.otpSetTimestamp;
        if (timeElapsed >= 60000) {
            req.session.user.otpCode = undefined;
            req.session.user.otpSetTimestamp = undefined;
            console.log("Expired OTP code cleaned up");
        }
    }
    next();
};
exports.userOtpExpiration = userOtpExpiration;
//forgot-password
const userEmailVerifyOtp = (req, res, next) => {
    const now = Date.now();
    if (req.session.otp && req.session.otp.otp && req.session.otp.otpSetTimestamp) {
        const timeElapsed = now - req.session.otp.otpSetTimestamp;
        if (timeElapsed >= 60000) { // Check if 1 minute has passed
            // Expire OTP code
            req.session.otp.otp = undefined;
            req.session.otp.otpSetTimestamp = undefined;
            console.log("Expired OTP code cleaned up");
        }
    }
    next();
};
exports.userEmailVerifyOtp = userEmailVerifyOtp;
const vendorOtpExpiration = (req, res, next) => {
    const now = Date.now();
    if (req.session.vendorData && req.session.vendorData.otpCode && req.session.vendorData.otpSetTimestamp) {
        const timeElapsed = now - req.session.vendorData.otpSetTimestamp;
        if (timeElapsed >= 60000) { // Check if 1 minute has passed
            // Expire OTP code
            req.session.vendorData.otpCode = undefined;
            req.session.vendorData.otpSetTimestamp = undefined;
            console.log("Expired OTP code cleaned up");
        }
    }
    next();
};
exports.vendorOtpExpiration = vendorOtpExpiration;
