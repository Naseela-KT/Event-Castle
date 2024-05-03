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
const customError_1 = require("../error/customError");
const messageModel_1 = __importDefault(require("../models/messageModel"));
const messageRepository_1 = __importDefault(require("../repositories/messageRepository"));
class MessageService {
    createMessage(conversationId, senderId, text, imageName, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield messageRepository_1.default.create({ conversationId, senderId, text, imageName, imageUrl });
            }
            catch (error) {
                console.error("Error in createMessage:", error);
                throw new customError_1.CustomError("Failed to create message.", 500);
            }
        });
    }
    findMessages(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield messageRepository_1.default.findByCondition({ conversationId });
            }
            catch (error) {
                console.error("Error in findMessages:", error);
                throw new customError_1.CustomError("Failed to retrieve messages.", 500);
            }
        });
    }
    updateStatus(msgId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield messageRepository_1.default.update(msgId, { isDeleted: true });
            }
            catch (error) {
                console.error("Error in updateStatus:", error);
                throw new customError_1.CustomError("Failed to update message status.", 500);
            }
        });
    }
    changeMessageView(msgId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield messageModel_1.default.findByIdAndUpdate(msgId, {
                    $push: { deletedIds: id },
                });
            }
            catch (error) {
                console.error("Error in changeMessageView:", error);
                throw new customError_1.CustomError("Failed to change message view.", 500);
            }
        });
    }
    changeReadStatus(chatId, senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return messageRepository_1.default.updateReadStatus(chatId, senderId);
            }
            catch (error) {
                console.error("Error in changeReadStatus:", error);
                throw new customError_1.CustomError("Failed to change the status.", 500);
            }
        });
    }
}
exports.default = new MessageService();
