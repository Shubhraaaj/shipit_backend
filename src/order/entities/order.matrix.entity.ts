import { Field, ObjectType } from "@nestjs/graphql"
import { truncate } from "fs"
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@ObjectType()
@Entity()
export class OrderMatrix {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	matrix_id: string

	@Field()
	@Column({ nullable: true })
	numberOfOrdersByStatus: string

	@Field()
	@Column({ nullable: true })
	topSourceCities: string

	@Field()
	@Column({ nullable: true })
	topDestCities: string

	@Field()
	@Column({ nullable: true })
	monthwiseOrders: string
}

