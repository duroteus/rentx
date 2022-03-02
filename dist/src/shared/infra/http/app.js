"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const AppError_1 = require("@shared/errors/AppError");
const swagger_json_1 = __importDefault(require("../../../swagger.json"));
const typeorm_1 = __importDefault(require("../typeorm"));
const routes_1 = require("./routes");
require("@shared/container");
(0, typeorm_1.default)("database_ignite");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use(routes_1.router);
app.use((err, request, response, next) => {
    if (err instanceof AppError_1.AppError) {
        return response
            .status(err.statusCode)
            .json({ message: err.message });
    }
    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    });
});
