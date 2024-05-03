"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const conversationController_1 = __importDefault(require("../controllers/conversationController"));
exports.router.post('/', conversationController_1.default.createChat);
exports.router.get('/', conversationController_1.default.findUserchats);
exports.default = exports.router;
