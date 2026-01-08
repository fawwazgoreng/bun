import type { UserRepository } from "../../domain/repository/userRepositorys";
import { registerValidation } from "../../interface/http/validator/uservalidatior";
import type { validator } from "../../types/global/validator";
import type { registerForm } from "../../types/user/repostori";

interface validatorResponse extends validator {
  data?: registerForm;
}

export class UserCase {
  public constructor(private userRepos: UserRepository) { }
  async login(request: Request) {
    const data = this.register;
    const res = this.userRepos.login(request);
    if (!res) {
      throw new Error("password atau username salah");
    }
  }

  async register(request: Request) {
    if (request.method === "POST" && request.headers.get("Content-Type")?.includes("Content-Type")) {
      const body = await request.json() as registerForm;
      const data: validatorResponse = registerValidation(body);
      if (data.status >= 400) {
        throw {
          status: data.status,
          message: data.message,
        };
      }
      if (!data.data) {
        throw {
          status: 404,
          message: "failed validation",
        };
      }
      const register = this.userRepos.register(data.data);
      if (register.status != 200) {
        throw new Error(register.message);
      }
      return register.status;
    }
  }
}
