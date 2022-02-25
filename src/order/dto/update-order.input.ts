import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class UpdateOrderInput {

  @Field()
  order_no: string

  @Field({ nullable: true })
  order_status: string

  @Field({ nullable: true })
  live_status: string

}
