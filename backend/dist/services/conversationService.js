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
const conversationRepository_1 = __importDefault(require("../repositories/conversationRepository"));
class ConversationService {
    createConversation(senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let chat = yield conversationRepository_1.default.findOne({
                    members: [senderId, receiverId],
                });
                if (!chat) {
                    const newChat = yield conversationRepository_1.default.create({
                        members: [senderId, receiverId],
                    });
                    return newChat;
                }
                return chat;
            }
            catch (error) {
                console.error("Error in createConversation:", error);
                throw new customError_1.CustomError("Error creating conversation.", 500);
            }
        });
    }
    findChat(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield conversationRepository_1.default.findByCondition({ members: { $in: [userId] } });
            }
            catch (error) {
                console.error("Error in findChat:", error);
                throw new customError_1.CustomError("Error finding chats.", 500);
            }
        });
    }
}
exports.default = new ConversationService();
