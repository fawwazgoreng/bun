import { Context } from "hono";
import { loginType, updateType, User, userResponse } from "../entity/user";
import { registerType } from "../entity/user";

export interface UserRepository {
  register(req: registerType): Promise<userResponse>;
  login(req: loginType ): Promise<userResponse>;
  logOut(req: Context): void;
}