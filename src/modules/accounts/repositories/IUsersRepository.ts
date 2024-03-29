import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
    findByName(name: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findByDriverLicense(driver_license: string): Promise<User>;
    findById(id: string): Promise<User>;
    list(): Promise<User[]>;
    create({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
