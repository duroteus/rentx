import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
    static toDTO({
        id,
        email,
        name,
        driver_license,
        avatar,
        avatar_url,
    }: User): IUserResponseDTO {
        const user = instanceToInstance({
            id,
            email,
            name,
            driver_license,
            avatar,
            avatar_url,
        });

        return user;
    }
}

export { UserMap };
