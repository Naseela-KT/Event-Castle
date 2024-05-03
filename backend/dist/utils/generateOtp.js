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
const nodemailer_1 = __importDefault(require("nodemailer"));
function generateOtp(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.USER_NAME,
                    pass: process.env.USER_PASSWORD,
                },
            });
            const mailOptions = {
                from: process.env.USER_NAME,
                to: email,
                subject: "Verification Code",
                text: `Your OTP code is: ${otpCode}`,
            };
            const info = yield transporter.sendMail(mailOptions);
            console.log("Email sent: " + info.response);
            return otpCode;
        }
        catch (error) {
            console.error("Error sending email:", error);
        }
    });
}
exports.default = generateOtp;
