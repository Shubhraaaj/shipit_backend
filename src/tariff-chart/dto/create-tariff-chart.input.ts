import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateTariffChartInput {
  @Field()
  tariff: string    // base 64
  @Field({ nullable: true })
  vendor_id: string

  @Field()
  priority_factor: number
}

