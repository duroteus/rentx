import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error("Token missing.");
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "ebeddd22b58fb7502ec2ea46ddd79154"
        ) as IPayload;

        const usersRepository = new UsersRepository();
        usersRepository.findById(user_id);

        if (!user_id) {
            throw new Error("User doesn't exists!");
        }

        next();
    } catch {
        throw new Error("Invalid token!");
    }
}
