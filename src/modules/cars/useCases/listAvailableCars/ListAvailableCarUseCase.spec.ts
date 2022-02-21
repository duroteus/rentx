import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car test",
            description: "Car description",
            daily_rate: 500,
            license_plate: "Car License plate",
            fine_amount: 1500,
            brand: "Car brand",
            category_id: "Category ID",
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car test 2",
            description: "Car description",
            daily_rate: 500,
            license_plate: "Car License plate",
            fine_amount: 1500,
            brand: "Car brand 2",
            category_id: "Category ID",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car test 2",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car test 2",
            description: "Car description",
            daily_rate: 500,
            license_plate: "Car License plate",
            fine_amount: 1500,
            brand: "Car brand 2",
            category_id: "Category ID",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car brand 2",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car test 2",
            description: "Car description",
            daily_rate: 500,
            license_plate: "Car License plate",
            fine_amount: 1500,
            brand: "Car brand 2",
            category_id: "Category ID",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "Category ID",
        });

        expect(cars).toEqual([car]);
    });
});
