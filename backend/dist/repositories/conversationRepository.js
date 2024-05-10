"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversationModel_1 = __importDefault(require("../models/conversationModel"));
const baseRepository_1 = require("./baseRepository");
class ConversationRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(conversationModel_1.default);
    }
    findByIdAndUpdate(id, text) {
        return conversationModel_1.default.findOneAndUpdate({ _id: id }, { $set: { recentMessage: text } });
    }
    findConversations(userId) {
        return conversationModel_1.default.find({ members: { $in: [userId] } }).sort({ updatedAt: -1 });
    }
}
exports.default = new ConversationRepository();
