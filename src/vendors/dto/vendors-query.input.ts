import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';


@InputType()
export class VendorQueryInput {
	@Field()
	srcCity: string
	@Field()
	destCity: string
	@Field({ nullable: true })
	pageNo: string
	@Field({ nullable: true })
	pageSize: string
	@Field({ nullable: true })
	name: string
	@Field({ nullable: true })
	price: string
	@Field({ nullable: true })
	sortBy: string
	@Field({ nullable: true })
	weight: number
	@Field({ nullable: true })
	type: string
}
