"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectToMongoDB_1 = require("./db/connectToMongoDB");
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const vendorRoutes_1 = __importDefault(require("./routes/vendorRoutes"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const otpExpirationMiddleware_1 = require("./middlewares/otpExpirationMiddleware");
const cookieParser = require("cookie-parser");
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const conversationRoutes_1 = __importDefault(require("./routes/conversationRoutes"));
const path_1 = __importDefault(require("path"));
const node_cron_1 = __importDefault(require("node-cron"));
const axios_1 = __importDefault(require("axios"));
const socket_1 = __importDefault(require("./socket"));
const http_1 = require("http");
exports.app = (0, express_1.default)();
dotenv_1.default.config();
// connectDB();
const server = (0, http_1.createServer)(exports.app);
const corsOptions = {
    origin: 'https://event-castle-hyj7.vercel.app', // Allow only this origin
    credentials: true, // Allow credentials
};
exports.app.use((0, cors_1.default)(corsOptions));
exports.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
exports.app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
const sessionMiddleware = (0, express_session_1.default)({
    secret: 'cfcyygyv',
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "lax"
    }
});
exports.app.use(sessionMiddleware);
exports.app.use(express_1.default.json());
exports.app.use(cookieParser());
exports.app.use(otpExpirationMiddleware_1.userOtpExpiration);
exports.app.use(otpExpirationMiddleware_1.vendorOtpExpiration);
exports.app.use(otpExpirationMiddleware_1.userEmailVerifyOtp);
exports.app.use('/api/admin', adminRoutes_1.default);
exports.app.use('/api/user', userRoutes_1.default);
exports.app.use('/api/vendor', vendorRoutes_1.default);
exports.app.use('/api/messages', messageRoutes_1.default);
exports.app.use('/api/conversation', conversationRoutes_1.default);
exports.app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized' });
    }
});
(0, socket_1.default)(server);
exports.app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../frontend/dist/index.html'));
});
const PORT = process.env.PORT;
// server.listen(PORT, () => {
//   console.log(`Server running on ${PORT}...`);
// });
const SERVER = process.env.SERVER || `http://localhost:${process.env.PORT}`;
const start = () => {
    node_cron_1.default.schedule('* * * * *', () => {
        console.log('Running a task every minute');
        // Replace the URL below with a request to your own server
        axios_1.default.get('https://event-castle.onrender.com/')
            .then(response => console.log('Health check successful'))
            .catch(error => console.error('Health check failed:', error));
    });
    server.listen(PORT, () => {
        console.log(`Server running on ${PORT}...`);
        (0, connectToMongoDB_1.connectDB)();
    });
};
start();
