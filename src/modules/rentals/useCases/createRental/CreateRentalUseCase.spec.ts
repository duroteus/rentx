import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
    const dayAdd24h = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car Test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24h,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("shouldn't be able to create a new rental to the user with another rental", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24h,
        });

        expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121314",
                expected_return_date: dayAdd24h,
            })
        ).rejects.toEqual(
            new AppError("This user already have an open rental.")
        );
    });

    it("shouldn't be able to create a new rental to a rented car", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24h,
        });

        expect(
            createRentalUseCase.execute({
                user_id: "12346",
                car_id: "121212",
                expected_return_date: dayAdd24h,
            })
        ).rejects.toEqual(new AppError("This car is already rented."));
    });

    it("shouldn't be able to create a new rental for less than 24h", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("The rental must have at least 24h"));
    });
});
