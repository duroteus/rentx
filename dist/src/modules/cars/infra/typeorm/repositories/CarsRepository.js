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
exports.CarsRepository = void 0;
const typeorm_1 = require("typeorm");
const Car_1 = require("../entities/Car");
class CarsRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Car_1.Car);
    }
    create({ id, name, description, brand, license_plate, fine_amount, daily_rate, category_id, specifications, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = this.repository.create({
                id,
                name,
                description,
                brand,
                license_plate,
                fine_amount,
                daily_rate,
                category_id,
                specifications,
            });
            yield this.repository.save(car);
            return car;
        });
    }
    findCarByLicensePlate(license_plate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({ license_plate });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne(id);
        });
    }
    listAvailable(name, brand, category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const carsQuery = this.repository
                .createQueryBuilder("cars")
                .where("available = :available", { available: true });
            if (name) {
                carsQuery.andWhere("cars.name = :name", { name });
            }
            if (brand) {
                carsQuery.andWhere("cars.brand = :brand", { brand });
            }
            if (category_id) {
                carsQuery.andWhere("cars.category_id = :category_id", {
                    category_id,
                });
            }
            const cars = yield carsQuery.getMany();
            return cars;
        });
    }
    updateAvailable(id, available) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository
                .createQueryBuilder()
                .update()
                .set({ available })
                .where("id = :id")
                .setParameters({ id })
                .execute();
        });
    }
}
exports.CarsRepository = CarsRepository;
