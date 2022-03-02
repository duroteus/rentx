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
exports.RefreshTokenUseCase = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const tsyringe_1 = require("tsyringe");
const auth_1 = __importDefault(require("@config/auth"));
const AppError_1 = require("@shared/errors/AppError");
let RefreshTokenUseCase = class RefreshTokenUseCase {
    constructor(usersTokensRepository, dateProvider) {
        this.usersTokensRepository = usersTokensRepository;
        this.dateProvider = dateProvider;
    }
    execute(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, sub } = (0, jsonwebtoken_1.verify)(token, auth_1.default.secret_refresh_token);
            const user_id = sub;
            const userToken = yield this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);
            if (!userToken) {
                throw new AppError_1.AppError("Refresh Token does not exists!");
            }
            yield this.usersTokensRepository.deleteById(userToken.id);
            const refresh_token = (0, jsonwebtoken_1.sign)({ email }, auth_1.default.secret_refresh_token, {
                subject: sub,
                expiresIn: auth_1.default.expires_in_refresh_token,
            });
            const expires_date = this.dateProvider.addDays(auth_1.default.expires_refresh_token_days);
            yield this.usersTokensRepository.create({
                user_id,
                refresh_token,
                expires_date,
            });
            return refresh_token;
        });
    }
};
RefreshTokenUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UsersTokensRepository")),
    __param(1, (0, tsyringe_1.inject)("DayjsDateProvider")),
    __metadata("design:paramtypes", [Object, Object])
], RefreshTokenUseCase);
exports.RefreshTokenUseCase = RefreshTokenUseCase;
