import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        await createCarUseCase.execute({
            name: "Car name",
            description: "Car description",
            daily_rate: 100,
            license_plate: "PNQ-1235",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });
    });

    it("shouldn't be able to create a car with already registered license plate", async () => {
        await createCarUseCase.execute({
            name: "Car1",
            description: "Car description",
            daily_rate: 100,
            license_plate: "PNQ-1235",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });

        await expect(
            createCarUseCase.execute({
                name: "Car2",
                description: "Car description",
                daily_rate: 100,
                license_plate: "PNQ-1235",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category",
            })
        ).rejects.toEqual(
            new AppError("This license plate is already registered.")
        );
    });

    it("should be able to register a new car with availability by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car available",
            description: "Car description",
            daily_rate: 100,
            license_plate: "PNQ-1236",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });

        expect(car.available).toBe(true);
    });
});
