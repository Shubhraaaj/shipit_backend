import { Field, ObjectType } from "@nestjs/graphql"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { IsEmail } from 'class-validator';

@ObjectType()
@Entity()
export class CityVendorXref {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field()
	@Column()
	vendor_id: string

	@Field()
	@Column()
	city: string

	@Field()
	@Column({ type: 'timestamp', default: new Date() })
	created_at: Date

	@Field()
	@Column({ type: 'timestamp', default: new Date() })
	updated_at: Date
}


