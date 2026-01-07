import type { UserRepository } from "../../architecture/repository/userRepository";
import type { loginForm } from "../../types/user/repostori";

export class createUser {
    public constructor(private userRepos : UserRepository){}
    async login(request : loginForm) {
        const res = this.userRepos.login(request);
        if (!res) {
            throw new Error("password atau username salah");
        }
        
    }
}