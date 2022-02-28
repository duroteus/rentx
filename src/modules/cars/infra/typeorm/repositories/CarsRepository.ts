import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepositories";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        id,
        name,
        description,
        brand,
        license_plate,
        fine_amount,
        daily_rate,
        category_id,
        specifications,
    }: ICreateCarDTO): Promise<Car> {
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

        await this.repository.save(car);

        return car;
    }

    async findCarByLicensePlate(license_plate: string): Promise<Car> {
        return this.repository.findOne({ license_plate });
    }

    async findById(id: string): Promise<Car> {
        return this.repository.findOne(id);
    }

    async listAvailable(
        name?: string,
        brand?: string,
        category_id?: string
    ): Promise<Car[]> {
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

        const cars = await carsQuery.getMany();

        return cars;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :id")
            .setParameters({ id })
            .execute();
    }
}

export { CarsRepository };
