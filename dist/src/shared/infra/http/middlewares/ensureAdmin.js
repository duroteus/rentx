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
exports.ensureAdmin = void 0;
const UsersRepository_1 = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");
const AppError_1 = require("@shared/errors/AppError");
function ensureAdmin(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.user;
        const usersRepository = new UsersRepository_1.UsersRepository();
        const user = yield usersRepository.findById(id);
        if (!user.isAdmin) {
            throw new AppError_1.AppError("You don't have permission.");
        }
        return next();
    });
}
exports.ensureAdmin = ensureAdmin;
