import { CreateVendorInput } from './create-vendor.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { truncate } from 'fs';

@InputType()
export class UpdateVendorInput extends PartialType(CreateVendorInput) {

  @Field({ nullable: true })
  vendor_id: string

  @Field()
  name: string

  @Field()
  phone_number: string

  @Field()
  email: string

  @Field({ nullable: true })
  website: string

  @Field({ nullable: true })
  address: string

  @Field(() => [String])
  service_cities: string[]

  @Field({ nullable: true })
  tariff_chart_id: string

  @Field()
  logo: string

  @Field({ nullable: true })
  created_at: Date

  @Field({ nullable: true })
  updated_at: Date

}
