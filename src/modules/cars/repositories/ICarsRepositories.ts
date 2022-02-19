import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create({
        name,
        description,
        brand,
        license_plate,
        fine_amount,
        daily_rate,
        category_id,
    }: ICreateCarDTO): Promise<Car>;
    findCarByLicensePlate(license_plate: string): Promise<Car>;
}

export { ICarsRepository };
