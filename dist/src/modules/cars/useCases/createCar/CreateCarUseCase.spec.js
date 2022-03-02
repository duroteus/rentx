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
const CarsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
const AppError_1 = require("@shared/errors/AppError");
const CreateCarUseCase_1 = require("./CreateCarUseCase");
let createCarUseCase;
let carsRepositoryInMemory;
describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase_1.CreateCarUseCase(carsRepositoryInMemory);
    });
    it("should be able to create a new car", () => __awaiter(void 0, void 0, void 0, function* () {
        yield createCarUseCase.execute({
            name: "Car name",
            description: "Car description",
            daily_rate: 100,
            license_plate: "PNQ-1235",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });
    }));
    it("shouldn't be able to create a car with already registered license plate", () => __awaiter(void 0, void 0, void 0, function* () {
        yield createCarUseCase.execute({
            name: "Car1",
            description: "Car description",
            daily_rate: 100,
            license_plate: "PNQ-1235",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });
        yield expect(createCarUseCase.execute({
            name: "Car2",
            description: "Car description",
            daily_rate: 100,
            license_plate: "PNQ-1235",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        })).rejects.toEqual(new AppError_1.AppError("This license plate is already registered."));
    }));
    it("should be able to register a new car with availability by default", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield createCarUseCase.execute({
            name: "Car available",
            description: "Car description",
            daily_rate: 100,
            license_plate: "PNQ-1236",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });
        expect(car.available).toBe(true);
    }));
});
