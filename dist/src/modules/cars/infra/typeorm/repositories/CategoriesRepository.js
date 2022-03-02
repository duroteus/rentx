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
exports.CategoriesRepository = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("../entities/Category");
class CategoriesRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Category_1.Category);
    }
    create({ name, description }) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = this.repository.create({
                name,
                description,
            });
            yield this.repository.save(category);
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.repository.findOne({ name });
            return category;
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.repository.find();
            return categories;
        });
    }
}
exports.CategoriesRepository = CategoriesRepository;
