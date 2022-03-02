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
const SpecificationsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory");
const AppError_1 = require("@shared/errors/AppError");
const CreateCarSpecificationUseCase_1 = require("./CreateCarSpecificationUseCase");
let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory_1.SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase_1.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    });
    it("should be able to add a new specification to the car", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Car name",
            description: "Car description",
            daily_rate: 100,
            license_plate: "PNQ-1235",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });
        const specification = yield specificationsRepositoryInMemory.create({
            name: "test",
            description: "test",
        });
        const specifications_id = [specification.id];
        const carsSpecifications = yield createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });
        expect(carsSpecifications).toHaveProperty("specifications");
        expect(carsSpecifications.specifications.length).toBe(1);
    }));
    it("shouldn't be able to add a new specification to a non-existent car", () => __awaiter(void 0, void 0, void 0, function* () {
        const car_id = "1234";
        const specifications_id = ["54321"];
        expect(createCarSpecificationUseCase.execute({
            car_id,
            specifications_id,
        })).rejects.toEqual(new AppError_1.AppError("This car isn't registered in our system."));
    }));
});
