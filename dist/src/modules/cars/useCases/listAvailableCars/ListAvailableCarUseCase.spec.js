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
const ListAvailableCarUseCase_1 = require("./ListAvailableCarUseCase");
let listAvailableCarsUseCase;
let carsRepositoryInMemory;
describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarUseCase_1.ListAvailableCarsUseCase(carsRepositoryInMemory);
    });
    it("should be able to list all available cars", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Car test",
            description: "Car description",
            daily_rate: 500,
            license_plate: "Car License plate",
            fine_amount: 1500,
            brand: "Car brand",
            category_id: "Category ID",
        });
        const cars = yield listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    }));
    it("should be able to list all available cars by name", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Car test 2",
            description: "Car description",
            daily_rate: 500,
            license_plate: "Car License plate",
            fine_amount: 1500,
            brand: "Car brand 2",
            category_id: "Category ID",
        });
        const cars = yield listAvailableCarsUseCase.execute({
            name: "Car test 2",
        });
        expect(cars).toEqual([car]);
    }));
    it("should be able to list all available cars by brand", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Car test 2",
            description: "Car description",
            daily_rate: 500,
            license_plate: "Car License plate",
            fine_amount: 1500,
            brand: "Car brand 2",
            category_id: "Category ID",
        });
        const cars = yield listAvailableCarsUseCase.execute({
            brand: "Car brand 2",
        });
        expect(cars).toEqual([car]);
    }));
    it("should be able to list all available cars by category", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Car test 2",
            description: "Car description",
            daily_rate: 500,
            license_plate: "Car License plate",
            fine_amount: 1500,
            brand: "Car brand 2",
            category_id: "Category ID",
        });
        const cars = yield listAvailableCarsUseCase.execute({
            category_id: "Category ID",
        });
        expect(cars).toEqual([car]);
    }));
});
