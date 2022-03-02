"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.AuthenticateUserUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const tsyringe_1 = require("tsyringe");
const auth_1 = __importDefault(require("@config/auth"));
const AppError_1 = require("@shared/errors/AppError");
let AuthenticateUserUseCase = class AuthenticateUserUseCase {
    constructor(usersRepository, usersTokensRepository, dateProvider) {
        this.usersRepository = usersRepository;
        this.usersTokensRepository = usersTokensRepository;
        this.dateProvider = dateProvider;
    }
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findByEmail(email);
            const { expires_in_token, secret_refresh_token, secret_token, expires_in_refresh_token, expires_refresh_token_days, } = auth_1.default;
            if (!user) {
                throw new AppError_1.AppError("Email or password incorrect!");
            }
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordMatch) {
                throw new AppError_1.AppError("Email or password incorrect!");
            }
            const token = (0, jsonwebtoken_1.sign)({}, secret_token, {
                subject: user.id,
                expiresIn: expires_in_token,
            });
            const refresh_token = (0, jsonwebtoken_1.sign)({ email }, secret_refresh_token, {
                subject: user.id,
                expiresIn: expires_in_refresh_token,
            });
            const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days);
            yield this.usersTokensRepository.create({
                user_id: user.id,
                refresh_token,
                expires_date: refresh_token_expires_date,
            });
            const tokenReturn = {
                token,
                user: {
                    name: user.name,
                    email: user.email,
                },
                refresh_token,
            };
            return tokenReturn;
        });
    }
};
AuthenticateUserUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UsersRepository")),
    __param(1, (0, tsyringe_1.inject)("UsersTokensRepository")),
    __param(2, (0, tsyringe_1.inject)("DayjsDateProvider")),
    __metadata("design:paramtypes", [Object, Object, Object])
], AuthenticateUserUseCase);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;
