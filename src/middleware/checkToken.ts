import { Context, Next } from "hono";
import { jwt } from "hono/jwt";

export const checkToken = async (c : Context, next : Next) => {
  try {
    const jwtMiddleware = jwt({
      secret: String(process.env["SECRET_TOKEN"]),
      alg: "HS256",
    });
    return await jwtMiddleware(c, next);
  } catch (error) {
    c.status(401);
    return c.json({
      message: "unauthorized",
    });
  }
}