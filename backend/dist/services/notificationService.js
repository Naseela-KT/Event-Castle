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
const notificationRepository_1 = __importDefault(require("../repositories/notificationRepository"));
const customError_1 = require("../error/customError");
class NotificationService {
    getNotifications(recipient) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield notificationRepository_1.default.findAllNotifications(recipient);
                return data;
            }
            catch (error) {
                console.error("Error in getNotifications:", error);
                throw new customError_1.CustomError("Failed to fetch notifications.", 500);
            }
        });
    }
    getUnreadNotifications(recipient) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield notificationRepository_1.default.findUnreadNotifications(recipient);
                return data;
            }
            catch (error) {
                console.error("Error in getUnreadNotifications:", error);
                throw new customError_1.CustomError("Failed to fetch unread notifications.", 500);
            }
        });
    }
    getNotificationForAdmin(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield notificationRepository_1.default.findByCondition({
                    recipient: adminId,
                });
                return data;
            }
            catch (error) {
                console.error("Error in getNotificationForAdmin:", error);
                throw new customError_1.CustomError("Failed to fetch notifications for admin.", 500);
            }
        });
    }
    changeReadStatus(id, recipient) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notificationItem = yield notificationRepository_1.default.getById(id);
                if (!notificationItem) {
                    throw new customError_1.CustomError("Notification not found.", 404);
                }
                notificationItem.read = !notificationItem.read;
                yield notificationItem.save();
                return yield notificationRepository_1.default.findByCondition({
                    recipient: recipient,
                });
            }
            catch (error) {
                console.error("Error in changeReadStatus:", error);
                throw new customError_1.CustomError("Failed to change read status.", 500);
            }
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notificationItem = yield notificationRepository_1.default.getById(_id);
                if (!notificationItem) {
                    throw new customError_1.CustomError("Notification not found.", 404);
                }
                return yield notificationRepository_1.default.delete(_id);
            }
            catch (error) {
                console.error("Error in deleteNotification:", error);
                throw new customError_1.CustomError("Failed to delete notification.", 500);
            }
        });
    }
}
exports.default = new NotificationService();
