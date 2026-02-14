import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import prisma from "../infrastructure/database/prisma/prismaclient";
import { loginType, registerType, User, userResponse } from "../entity/user";

export class userService {
  first = async () => {
    return (await prisma.user.findFirst()) as User;
  };
  registerService = async (req: registerType) => {
    try {
      const user = (await prisma.user.create({
        data: {
          name: req.name,
          password: await Bun.password.hash(req.password),
          email: req.email,
        },
      })) as User;
      const res: userResponse = {
        message: "success registered",
        user: {
          name: user.name,
          email: user.email,
          updated_at: user.updated_at,
        },
      };
      return res;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        let message = "Internal Server Error";
        if (error.code == "P2002") {
          message = "email is already taken";
        } else {
          message = error.message;
        }
        const res = {
          status: 422,
          message: message,
        };
        throw res;
      }
      const res = {
        status: 500,
        message: "internal server error",
      };
      throw res;
    }
  };

  loginService = async (req: loginType) => {
    try {
      const user = await prisma.user.findFirst({
        select: {
          id: true,
          name: true,
          password: true,
          email: true,
        },
        where: {
          email: req.email,
        },
      });
      if (!user || !(await Bun.password.verify(req.password, user.password))) {
        throw {
          status: 401,
          message: "username atau password salah",
        };
      }
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        let message = Object.keys(error.message)[0] ?? "Internal Server Error";
        const res = {
          status: 422,
          message: message,
        };
        throw res;
      }
      throw error;
    }
  };
}
