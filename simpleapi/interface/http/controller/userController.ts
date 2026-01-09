import type { UserRepository } from "../../../domain/repository/userRepositorys";
import { userRepositoriesImpl } from "../../../infrastructure/repository/userRepository";
import type { userResponseType } from "../../../types/global/responseapi";
import type { loginForm, registerForm } from "../../../types/user/repostori";

const repositoryImpl = new userRepositoriesImpl();

class userController implements UserRepository {
  async register(req: registerForm): Promise<userResponseType> {
    const res = await repositoryImpl.register(req);
    const data: userResponseType = await res.json() as userResponseType;
    return data;
  }
  login(request: loginForm): Promise<userResponseType> { }
  logout(): void { }
}

export default userController;
