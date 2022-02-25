import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class LoginVendorInput {
	@Field()
	@IsEmail("Use a Valid Email!")
	user_email: string
	@Field()
	password: string
}
