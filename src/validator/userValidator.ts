import * as z from "zod";
import { Validator } from "./global";
import { loginType, registerType } from "../entity/user";

const loginSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  email: z.email().min(3).max(100),
  password: z.string().min(3).max(100),
});

const registerSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  email: z.email().min(3).max(100),
  password: z.string().min(3).max(100),
});

export class UserValidation {
  public register = (req: registerType) => {
    Validator(registerSchema, req);
  };
  public login = (req: loginType) => {
    Validator(loginSchema, req);
  };
}
