import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24h = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider
        );
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24h,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("shouldn't be able to create a new rental to the user with another rental", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24h,
            });

            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121314",
                expected_return_date: dayAdd24h,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("shouldn't be able to create a new rental to a rented car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24h,
            });

            await createRentalUseCase.execute({
                user_id: "12346",
                car_id: "121212",
                expected_return_date: dayAdd24h,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("shouldn't be able to create a new rental for less than 24h", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
