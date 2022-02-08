import { Specification } from "../../model/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

class ListSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository) {}

    execute(): Specification[] {
        const categories = this.specificationsRepository.list();

        return categories;
    }
}

export { ListSpecificationUseCase };
