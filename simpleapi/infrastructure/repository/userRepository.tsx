import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import type { loginForm, registerForm } from "../../types/user/repostori";
import { Prisma } from "../db/prisma";
import { User } from "../../domain/entities/user";
import type { userResponseType } from "../../types/global/responseapi";

export class userRepositoriesImpl {
    async login(request: loginForm) {
        const user = "";
        const res = "";
        return await res;
    }
    async register(req: registerForm) {
        try {
            const data = await Prisma.user.create({
                data: {
                    name: req.name,
                    email: req.email,
                    password: await Bun.password.hash(req.password)
                }
            });
            const user = new User(data.id, data.password, data.email, data.name);
            const res: userResponseType = {
                message: "success create user",
                status: 201,
                data: user
            };
            return Response.json(res);
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == "P2002") {
                    const res: userResponseType = {
                        status: 422,
                        message: "duplicat entry for email "
                    };
                    return Response.json(res);
                }
                const res: userResponseType = {
                    status: 422,
                    message: e.message
                };
                return Response.json(res);
            }
            const res: userResponseType = {
                status: 500,
                message: "internal server error , try again"
            };
            return Response.json(res);
        }
    }
    logout(): void {

    }
}