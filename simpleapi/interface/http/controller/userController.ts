import type { UserRepository } from "../../../domain/repository/userRepositorys";
import type { userEntities } from "../../../types/user/entiti";
import type { registerForm } from "../../../types/user/repostori";


class userController implements UserRepository {
    register =  (req: registerForm) => {
        
    }
    login(request: registerForm): userEntities {
        const res: userEntities = {
            id: 1,
            name: '',
            email: '',
            password: '',
        }
        return res;
    }
    logout(): void {

    }
}

export default userController;