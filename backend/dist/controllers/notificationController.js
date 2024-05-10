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
const notificationService_1 = __importDefault(require("../services/notificationService"));
const handleError_1 = require("../utils/handleError");
class NotificationController {
    getAllNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const pageSize = parseInt(req.query.pageSize) || 8;
                const recipient = req.query.recipient;
                const { notifications, count } = yield notificationService_1.default.getNotifications(recipient, page, pageSize);
                const totalPages = Math.ceil(count / pageSize);
                res.status(201).json({ notification: notifications, totalPages: totalPages });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getAllNotifications");
            }
        });
    }
    // async getAdminNotifications(req: Request, res: Response){
    //   try {
    //     const adminId:string=req.query.adminId as string
    //     const data=await NotificationService.getNotificationForAdmin(adminId)
    //     res.status(201).json({notification:data})
    //   } catch (error) {
    //     handleError(res, error, "getAdminNotifications");
    //   }
    // }
    toggleRead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id;
                const recipient = req.body.recipient;
                const data = yield notificationService_1.default.changeReadStatus(id, recipient);
                res.status(201).json({ notification: data });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "toggleRead");
            }
        });
    }
    deleteNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.query);
                const { id: _id, recipient } = req.query;
                const deleteData = yield notificationService_1.default.delete(_id);
                // const data=await NotificationService.getNotifications(recipient)
                res.status(201).json({ notification: deleteData });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "deleteNotification");
            }
        });
    }
    getCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { recipient } = req.query;
                const data = yield notificationService_1.default.getUnreadNotifications(recipient);
                res.status(201).json({ count: data === null || data === void 0 ? void 0 : data.length });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getCount");
            }
        });
    }
}
;
exports.default = new NotificationController();
