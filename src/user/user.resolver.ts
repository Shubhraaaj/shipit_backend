import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginUserInput } from './dto/user-login.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => User, { name: "userLogin" })
  userLogin(@Args('userLoginInput') userLoginInput: LoginUserInput) {
    return this.userService.loginForBookingOrder(userLoginInput);
  }


  @Query(() => User, { name: 'verifyUserOtp' })
  findAll(@Args('email') email: string, @Args('otp') otp: number) {
    return this.userService.verifyUserLogin(email, otp);
  }

}
