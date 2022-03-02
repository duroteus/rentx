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
const UsersRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
const AppError_1 = require("@shared/errors/AppError");
const createUserUseCase_1 = require("../createUser/createUserUseCase");
const AuthenticateUserUseCase_1 = require("./AuthenticateUserUseCase");
describe("Authenticate User", () => {
    let authenticateUserUseCase;
    let usersRepositoryInMemory;
    let createUserUseCase;
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase_1.AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new createUserUseCase_1.CreateUserUseCase(usersRepositoryInMemory);
    });
    it("should be able to authenticate an user", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            driver_license: "001234",
            email: "user@test.com",
            password: "deusehtop",
            name: "User test",
        };
        yield createUserUseCase.execute(user);
        const result = yield authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        expect(result).toHaveProperty("token");
    }));
    it("shouldn't be able to authenticate an inexistent user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(authenticateUserUseCase.execute({
            email: "false@email.com",
            password: "DeusehtoP",
        })).rejects.toEqual(new AppError_1.AppError("Email or password incorrect!"));
    }));
    it("shouldn't be able to authenticate an user with wrong password", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            driver_license: "001234",
            email: "user@test.com",
            password: "deusehtop",
            name: "User test",
        };
        yield createUserUseCase.execute(user);
        yield expect(authenticateUserUseCase.execute({
            email: user.email,
            password: "DeusEhToP",
        })).rejects.toEqual(new AppError_1.AppError("Email or password incorrect!"));
    }));
});
