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
exports.RefreshTokenController = void 0;
const tsyringe_1 = require("tsyringe");
const RefreshTokenUseCase_1 = require("./RefreshTokenUseCase");
class RefreshTokenController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = request.body.token ||
                request.headers["x-access-token"] ||
                request.query.token;
            const refreshTokenUseCase = tsyringe_1.container.resolve(RefreshTokenUseCase_1.RefreshTokenUseCase);
            const refresh_token = yield refreshTokenUseCase.execute(token);
            return response.json(refresh_token);
        });
    }
}
exports.RefreshTokenController = RefreshTokenController;
