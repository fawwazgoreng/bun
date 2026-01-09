import { resolve } from "bun";
import type { UserRepository } from "../../domain/repository/userRepositorys";
import { registerValidation } from "../../interface/http/validator/uservalidatior";
import type { userRequestType, userResponseType } from "../../types/global/responseapi";
import type { validator } from "../../types/global/validator";
import type { registerForm } from "../../types/user/repostori";
import type { userEntities } from "../../types/user/entiti";

interface validatorResponse extends validator {
  data?: registerForm;
}

export class UserCase {
  public constructor(private userRepos: UserRepository) { }
  // async login(request: Request) {
    // const data = this.register;
    // const res = this.userRepos.login(request);
    // if (!res) {
    //   throw new Error("password atau username salah");
    // }
  // }

  async register(request: Request) {
    if (request.method === "POST" && request.headers.get("Content-Type")?.includes("application/json")) {
      const body = await request.json() as registerForm;
      const data: userRequestType = registerValidation(body);
      if (data.status >= 400) {
        return Response.json({
          status : data.status,
          message : data.message
        } , {
          status : data.status,
          headers : {
            "Content-Type" : "application/json"
          }
        });
      }
      if (!data.data) {
        return Response.json({
          status : 422,
          message : "bad Request"
        } , {
          status : 422,
          headers : {
            "Content-Type" : "application/json"
          }
        });
      }
      const register = await this.userRepos.register(data.data);
      return Response.json(register , {
        status : register.status,
        headers : {
          "Content-Type" : "application/json"
        }
      });
    }
  }
}
