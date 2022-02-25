import { Field, ObjectType } from "@nestjs/graphql"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { IsEmail } from 'class-validator';

@ObjectType()
@Entity()
export class Auths {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field()
	@IsEmail()
	@Column()
	user_email: string

	@Field()
	@Column()
	vendor_id: string

	@Field()
	@Column()
	auth_token: string

	@Field()
	@Column({ default: false })
	is_active: boolean

	@Field()
	@Column({ type: 'timestamp', default: new Date() })
	created_at: Date

	@Field()
	@Column({ type: 'timestamp', default: new Date() })
	updated_at: Date
}


