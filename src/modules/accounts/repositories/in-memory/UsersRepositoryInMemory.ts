import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async findByName(name: string): Promise<User> {
        const user = this.users.find((user) => user.name === name);

        return user;
    }
    async findByEmail(email: string): Promise<User> {
        const user = this.users.find((user) => user.email === email);

        return user;
    }
    async findByDriverLicense(driver_license: string): Promise<User> {
        const user = this.users.find(
            (user) => user.driver_license === driver_license
        );

        return user;
    }
    async findById(id: string): Promise<User> {
        const user = this.users.find((user) => user.id === id);

        return user;
    }
    async list(): Promise<User[]> {
        return this.users;
    }
    async create({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            email,
            password,
            driver_license,
        });

        this.users.push(user);
    }
}

export { UsersRepositoryInMemory };
