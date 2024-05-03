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
const liveService_1 = __importDefault(require("../services/liveService"));
const handleError_1 = require("../utils/handleError");
class LiveController {
    getLive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield liveService_1.default.getAllLive();
                res.status(200).json({ live: data });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "getLive");
            }
        });
    }
    addLive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { url } = req.body;
                const data = yield liveService_1.default.addNewLive(url);
                res.status(200).json({ live: data });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "addLive");
            }
        });
    }
    changeLiveStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { url } = req.body;
                const data = yield liveService_1.default.changeStatus(url);
                res.status(200).json({ live: data });
            }
            catch (error) {
                (0, handleError_1.handleError)(res, error, "changeLiveStatus");
            }
        });
    }
}
;
exports.default = new LiveController();
