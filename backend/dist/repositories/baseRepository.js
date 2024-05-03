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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findById(id);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItem = new this.model(data);
            return yield newItem.save();
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findByIdAndUpdate(id, data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findByIdAndDelete(id);
        });
    }
    countDocuments(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.countDocuments(condition || {});
        });
    }
    findOne(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne(condition);
        });
    }
    findByCondition(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find(condition);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne({ email });
        });
    }
}
exports.BaseRepository = BaseRepository;
