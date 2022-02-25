import { Field, ObjectType } from "@nestjs/graphql"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { IsEmail } from 'class-validator';

@ObjectType()
@Entity()
export class User {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field()
	@IsEmail()
	@Column()
	email: string

	@Field()
	@Column({ nullable: true })
	otp: number

	@Field()
	@Column({ type: 'timestamp', default: new Date() })
	created_at: Date

	@Field()
	@Column({ type: 'timestamp', default: new Date() })
	updated_at: Date
}


