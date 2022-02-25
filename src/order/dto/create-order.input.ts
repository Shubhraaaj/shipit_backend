import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field()

  @Field()
  sender: string

  @Field()
  receiver: string

  @Field()
  pickup_date_time: string

  @IsEmail()
  @Field()
  created_by: string

  @Field()
  amount: string

  @Field()
  vendor_id: string

  @Field()
  weight: string

  @Field()
  type: string

  @Field()
  priority: string

  @Field()
  weight_unit: string

  @Field()
  destination_city: string

  @Field()
  source_city: string
}
