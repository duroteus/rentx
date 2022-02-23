import { inject, injectable } from "tsyringe";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}
    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rental> {
        const minimumTimeForRent = 24;
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (carUnavailable) {
            throw new AppError("This car is already rented.");
        }

        const rentalOpenToUser =
            await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("This user already have an open rental.");
        }

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date
        );

        if (compare < minimumTimeForRent) {
            throw new AppError("The rental must have at least 24h");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
