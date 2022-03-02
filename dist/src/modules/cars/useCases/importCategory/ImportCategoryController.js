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
exports.ImportCategoryController = void 0;
const tsyringe_1 = require("tsyringe");
const ImportCategoryUseCase_1 = require("./ImportCategoryUseCase");
class ImportCategoryController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { file } = request;
            const importCategoryUseCase = tsyringe_1.container.resolve(ImportCategoryUseCase_1.ImportCategoryUseCase);
            yield importCategoryUseCase.execute(file);
            return response.status(201).send();
        });
    }
}
exports.ImportCategoryController = ImportCategoryController;
