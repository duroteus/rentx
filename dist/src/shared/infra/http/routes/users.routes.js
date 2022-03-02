"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const createUserController_1 = require("@modules/accounts/useCases/createUser/createUserController");
const UpdateUserAvatarController_1 = require("@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController");
const upload_1 = __importDefault(require("../../../../config/upload"));
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const usersRoutes = (0, express_1.Router)();
exports.usersRoutes = usersRoutes;
const uploadAvatar = (0, multer_1.default)(upload_1.default.upload("./tmp/avatar"));
const createUserController = new createUserController_1.CreateUserController();
const updateAvatarController = new UpdateUserAvatarController_1.UpdateUserAvatarController();
usersRoutes.post("/", createUserController.handle);
usersRoutes.patch("/avatar", ensureAuthenticated_1.ensureAuthenticated, uploadAvatar.single("avatar"), updateAvatarController.handle);
