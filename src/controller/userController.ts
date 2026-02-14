import { ZodError } from "zod";
import { UserRepository } from "../repository/userRepository";
import { userService } from "../services/userService";
import { UserValidation } from "../validator/userValidator";
import { loginType, User, userResponse } from "../entity/user";
import { registerType } from "../entity/user";
import jwtServices from "../services/jwtServices";
import { Context } from "hono";

export class userController implements UserRepository {
  private userService;
  private userValidate;
  public constructor() {
    this.userService = new userService();
    this.userValidate = new UserValidation();
  }
  async register(req: registerType): Promise<userResponse> {
    try {
      this.userValidate.register(req);
      return await this.userService.registerService(req);
    } catch (error) {
      if (error instanceof ZodError) {
        const res = {
          status: 422,
          message: error.issues[0].message,
          error: error.issues,
        };
        return res;
      }
      const res = {
        status: 500,
        message: "internal server error",
      };
      return res;
    }
  }
  async login(req: loginType) : Promise<userResponse> {
    try {
      this.userValidate.login(req);
      const user = await this.userService.loginService(req) as User;
      const token = await new jwtServices().generateToken(user);
      const res = {
        status: 200,
        message : 'berhasil login',
        token: token,
      };
      return res;
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          status: 422,
          message : String(error.issues.values),
          error
        };
      }
      return error as userResponse;
    }
  }
  async logOut(req : Context) {
    
  }

}
