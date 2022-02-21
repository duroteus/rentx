import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepositories";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({
        name,
        description,
        brand,
        license_plate,
        fine_amount,
        daily_rate,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
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
    }

    async findCarByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async listAvailable(
        name?: string,
        brand?: string,
        category_id?: string
    ): Promise<Car[]> {
        const cars = this.cars.filter((car) => {
            if (
                (car.available === true && !name && !brand && !category_id) ||
                (car.available === true &&
                    ((name && car.name === name) ||
                        (brand && car.brand === brand) ||
                        (category_id && car.category_id === category_id)))
            ) {
                return car;
            }
            return null;
        });

        return cars;
    }
}

export { CarsRepositoryInMemory };
