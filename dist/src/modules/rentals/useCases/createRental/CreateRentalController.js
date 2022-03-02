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
exports.CreateRentalController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateRentalUseCase_1 = require("./CreateRentalUseCase");
class CreateRentalController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { car_id, expected_return_date } = request.body;
            const { id } = request.user;
            const createRentalUseCase = tsyringe_1.container.resolve(CreateRentalUseCase_1.CreateRentalUseCase);
            const rental = yield createRentalUseCase.execute({
                car_id,
                user_id: id,
                expected_return_date,
            });
            return response.status(201).json(rental);
        });
    }
}
exports.CreateRentalController = CreateRentalController;
