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
const conversationService_1 = __importDefault(require("../services/conversationService"));
const handleError_1 = require("../utils/handleError");
class ConversationController {
    createChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { senderId, receiverId } = req.body;
                const chat = yield conversationService_1.default.createConversation(senderId, receiverId);
                res.status(200).json(chat);
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "createChat");
            }
        });
    }
    findUserchats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = req.query.userId;
                const chats = yield conversationService_1.default.findChat(userId);
                res.status(200).json(chats);
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "findUserchats");
            }
        });
    }
}
exports.default = new ConversationController();
