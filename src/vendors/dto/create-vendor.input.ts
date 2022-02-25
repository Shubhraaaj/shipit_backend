import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateVendorInput {
  @Field()
  name: string
  @Field()
  @IsEmail()
  email: string
  @Field()
  phone_number: string
  @Field()
  password: string
}
