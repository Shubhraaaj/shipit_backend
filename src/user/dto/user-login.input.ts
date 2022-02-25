import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class LoginUserInput {
	@Field()
	@IsEmail("Use a Valid Email!")
	email: string
}