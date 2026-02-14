import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { userController } from "./controller/userController";
import { loginType, registerType, User } from "./entity/user";
import { StatusCode } from "hono/utils/http-status";
import { checkToken } from "./middleware/checkToken";
import { HTTPException } from "hono/http-exception";
const app = new Hono();
const UserController = new userController();

app.use("*", prettyJSON());

app.get("/", (c) => {
  return c.json(typeof c);
});
app.get("/user", (c) => {
  return c.json({ id: 1, name: "John Doe" });
});

app.post("/register", async (c) => {
  try {
    const payload: registerType = await c.req.json();
    const res = await UserController.register(payload);
    c.status(res.status as StatusCode);
    return c.json(res);
  } catch (error: any) {
    throw new HTTPException(error);
  }
});

app.post("/login", async (c) => {
  try {
    const payload: loginType = await c.req.json();
    const res = await UserController.login(payload);
    c.status(res.status as StatusCode);
    return c.json(res);
  } catch (error: any) {
    throw new HTTPException(error);
  }
});

app
  .use("/post", checkToken)
  .get("/post", (c) => {
    return c.json("test");
  })
  .post("/post", async (c) => {
    try {
      const payload: registerType = await c.req.json();
      const res = await UserController.register(payload);
      c.status(res.status as StatusCode);
      return c.json(res);
    } catch (error: any) {
      throw new HTTPException(error);
    }
  });

app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json(error.getResponse());
  }
  c.status(500);
  return c.json({
    status: 500,
    message: "internal server error",
  });
});

export default app;
