import { Field, ObjectType } from "@nestjs/graphql"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { IsEmail } from 'class-validator';

@ObjectType()
@Entity()
export class VendorPagination {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field()
	@Column({ type: "int" })
	total_elements: number

	@Field()
	@Column()
	result: string


}


