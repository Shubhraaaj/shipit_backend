import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { LoginUserInput } from './dto/user-login.input';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    userLogin(userLoginInput: LoginUserInput): Promise<User>;
    findAll(email: string, otp: number): Promise<User>;
}
