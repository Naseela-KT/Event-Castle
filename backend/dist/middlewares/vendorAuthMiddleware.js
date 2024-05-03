"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function vendorAuth(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        console.log('Token not provided');
        return res.status(401).json({ message: 'Token not provided' });
    }
    const accessToken = token.split(' ')[1];
    jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.Vendor = decoded;
        console.log("extracted info from vendor token", req.Vendor);
        next();
    });
}
exports.default = vendorAuth;
