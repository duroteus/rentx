import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateCarDTO {
    id?: string;
    name: string;
    description: string;
    brand: string;
    license_plate: string;
    daily_rate: number;
    fine_amount: number;
    available?: boolean;
    category_id: string;
    specifications?: Specification[];
}

export { ICreateCarDTO };
