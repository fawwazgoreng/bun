import type { userEntities } from "../../types/user/entiti";
import type { loginForm, registerForm } from "../../types/user/repostori";

export interface UserRepository {
    login(user : loginForm) : userEntities,
    register(user : registerForm) : void
    logout(): void
};