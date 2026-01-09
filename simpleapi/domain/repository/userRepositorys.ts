import type { userResponseType } from "../../types/global/responseapi";
import type { loginForm, registerForm } from "../../types/user/repostori";

export interface UserRepository {
    login(request : loginForm) : Promise<userResponseType>,
    register(req : registerForm) : Promise<userResponseType>
    logout(): void
};