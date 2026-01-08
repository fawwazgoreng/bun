import type { userEntities } from "../../types/user/entiti";
import type { loginForm, registerForm } from "../../types/user/repostori";

export interface UserRepository {
    login(request : loginForm) : userEntities,
    register(req : registerForm) : any
    logout(): void
};