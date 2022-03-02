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
exports.UsersRepository = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("@modules/accounts/infra/typeorm/entities/User");
class UsersRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(User_1.User);
    }
    create({ id, name, email, password, driver_license, avatar, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.repository.create({
                id,
                name,
                email,
                password,
                driver_license,
                avatar,
            });
            yield this.repository.save(user);
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findOne({ name });
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findOne({ email });
            return user;
        });
    }
    findByDriverLicense(driver_license) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findOne({ driver_license });
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findOne(id);
            return user;
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.repository.find();
            return users;
        });
    }
}
exports.UsersRepository = UsersRepository;
