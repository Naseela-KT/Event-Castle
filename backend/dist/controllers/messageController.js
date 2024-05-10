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
const messageModel_1 = __importDefault(require("../models/messageModel"));
const messageService_1 = __importDefault(require("../services/messageService"));
const handleError_1 = require("../utils/handleError");
const conversationService_1 = __importDefault(require("../services/conversationService"));
class MessageController {
    createMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { conversationId, senderId, text, imageName, imageUrl } = req.body;
                const response = yield messageService_1.default.createMessage(conversationId, senderId, text, imageName, imageUrl);
                yield conversationService_1.default.updateConversation(conversationId, text);
                res.status(200).json(response);
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "createMessage");
            }
        });
    }
    getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversationId = req.query.conversationId;
            try {
                const messages = yield messageService_1.default.findMessages(conversationId);
                res.status(200).json(messages);
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getMessages");
            }
        });
    }
    deleteAMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const msgId = req.body.msgId;
                const messages = yield messageService_1.default.updateStatus(msgId);
                res.status(200).json({ messages });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "deleteAMessage");
            }
        });
    }
    changeViewMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { msgId, id } = req.body;
                const messages = yield messageService_1.default.changeMessageView(msgId, id);
                res.status(200).json({ messages });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "changeViewMessage");
            }
        });
    }
    addEmoji(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { msgId, emoji } = req.body;
                const messages = yield messageModel_1.default.findByIdAndUpdate(msgId, {
                    $set: { emoji: emoji },
                });
                res.status(200).json({ messages });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "addEmoji");
            }
        });
    }
    changeRead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { chatId, senderId } = req.body;
                const messages = yield messageService_1.default.changeReadStatus(chatId, senderId);
                res.status(200).json({ messages });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "changeRead");
            }
        });
    }
}
exports.default = new MessageController();
