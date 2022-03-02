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
exports.ListSpecificationController = void 0;
const tsyringe_1 = require("tsyringe");
const ListSpecificationUseCase_1 = require("./ListSpecificationUseCase");
class ListSpecificationController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const listSpecificationUseCase = tsyringe_1.container.resolve(ListSpecificationUseCase_1.ListSpecificationUseCase);
            const all = yield listSpecificationUseCase.execute();
            return response.json(all);
        });
    }
}
exports.ListSpecificationController = ListSpecificationController;
