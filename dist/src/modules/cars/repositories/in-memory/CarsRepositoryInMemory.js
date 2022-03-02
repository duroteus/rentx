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
exports.CarsRepositoryInMemory = void 0;
const Car_1 = require("@modules/cars/infra/typeorm/entities/Car");
class CarsRepositoryInMemory {
    constructor() {
        this.cars = [];
    }
    create({ id, name, description, brand, license_plate, fine_amount, daily_rate, category_id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = new Car_1.Car();
            Object.assign(car, {
                id,
                name,
                description,
                brand,
                license_plate,
                fine_amount,
                daily_rate,
                available: true,
                category_id,
            });
            this.cars.push(car);
            return car;
        });
    }
    findCarByLicensePlate(license_plate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cars.find((car) => car.license_plate === license_plate);
        });
    }
    listAvailable(name, brand, category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = this.cars.filter((car) => {
                if ((car.available === true && !name && !brand && !category_id) ||
                    (car.available === true &&
                        ((name && car.name === name) ||
                            (brand && car.brand === brand) ||
                            (category_id && car.category_id === category_id)))) {
                    return car;
                }
                return null;
            });
            return cars;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cars.find((car) => car.id === id);
        });
    }
    updateAvailable(id, available) {
        return __awaiter(this, void 0, void 0, function* () {
            const findIndex = this.cars.findIndex((car) => car.id === id);
            this.cars[findIndex].available = available;
        });
    }
}
exports.CarsRepositoryInMemory = CarsRepositoryInMemory;
