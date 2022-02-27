import { Repository } from 'typeorm';
import { LoginUserInput } from './dto/user-login.input';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    loginForBookingOrder(loginUserInput: LoginUserInput): Promise<User>;
    verifyUserLogin(email: string, otp: number): Promise<User>;
}
