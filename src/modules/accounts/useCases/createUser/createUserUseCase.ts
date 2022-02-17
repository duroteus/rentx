import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const emailAlreadyTaken = await this.usersRepository.findByEmail(email);
        const usedDriverLicense =
            await this.usersRepository.findByDriverLicense(driver_license);

        if (emailAlreadyTaken) {
            throw new Error("This email is already taken");
        }

        if (usedDriverLicense) {
            throw new Error("This driver license is already in use.");
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license,
        });
    }
}

export { CreateUserUseCase };
