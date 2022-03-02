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
exports.SpecificationsRepository = void 0;
const typeorm_1 = require("typeorm");
const Specification_1 = require("../entities/Specification");
class SpecificationsRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Specification_1.Specification);
    }
    create({ name, description, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const specification = this.repository.create({
                name,
                description,
            });
            yield this.repository.save(specification);
            return specification;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const specification = yield this.repository.findOne({ name });
            return specification;
        });
    }
    findByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const specifications = yield this.repository.findByIds(ids);
            return specifications;
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const specifications = yield this.repository.find();
            return specifications;
        });
    }
}
exports.SpecificationsRepository = SpecificationsRepository;
