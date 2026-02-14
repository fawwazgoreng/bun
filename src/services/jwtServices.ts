import { sign } from "hono/utils/jwt/jwt";
import { User } from "../entity/user";

export default class jwtServices {

  public async generateToken(data: User) {
    const payload = {
      id: data.id,
      name: data.name,
      email: data.email,
    };
    const secret = process.env['SECRET_TOKEN'] ?? "secret sekali bro";
    const token = await sign(payload, secret);
    return token;
  }
  
}