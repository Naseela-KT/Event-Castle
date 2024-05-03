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
const liveRepository_1 = __importDefault(require("../repositories/liveRepository"));
class LiveService {
    addNewLive(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield liveRepository_1.default.create({ url });
                return data;
            }
            catch (error) {
                console.error("Error in addNewLive:", error);
                throw new customError_1.CustomError("Failed to create a new live record.", 500);
            }
        });
    }
    changeStatus(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield liveRepository_1.default.changeStatusById(url);
                return data;
            }
            catch (error) {
                console.error("Error in changeStatus:", error);
                throw new customError_1.CustomError("Failed to change status.", 500);
            }
        });
    }
    getAllLive() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield liveRepository_1.default.findByCondition({ finished: false });
                return data;
            }
            catch (error) {
                console.error("Error in getAllLive:", error);
                throw new customError_1.CustomError("Failed to retrieve live records.", 500);
            }
        });
    }
}
exports.default = new LiveService();
