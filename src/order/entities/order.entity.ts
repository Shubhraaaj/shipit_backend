import { Field, ObjectType } from "@nestjs/graphql"
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@ObjectType()
@Entity()
export class Order {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  order_id: string

  @Field()
  @Column({ unique: true })
  order_no: string

  @Field()
  @Column({ type: "json" })
  sender: string

  @Field()
  @Column({ type: "json" })
  live_status: string

  @Field()
  @Column({ type: "json" })
  receiver: string

  @Field()
  @Column({
    // type: "json"
    // type: "enum",
    // enum: OrderStatus,
    // default: OrderStatus.shiped
  })
  order_status: string

  @Field()
  @Column({ unique: true })
  tracking_id: string

  @Field()
  @Column()
  amount: string

  @Field()
  @Column({ type: "uuid" })
  vendor_id: string

  @Field()
  @Column()
  weight: string

  @Field()
  @Column({
    // type: 'enum',
    // enum: OrderType,
    // default: OrderType.a

  })
  type: string

  @Field()
  @Column({
    // type: "enum",
    // enum: PriorityType,
    // default: PriorityType.low
  })
  priority: string

  @Field()
  @Column()
  weight_unit: string

  @Field()
  @Column()
  destination_city: string

  @Field()
  @Column()
  source_city: string

  @Field()
  @Column({ nullable: true })
  created_by: string

  @Field()
  @Column({ type: 'timestamp' })
  pickup_date_time: Date

  @Field()
  @Column({ type: 'timestamp', default: new Date() })
  created_at: Date

  @Field()
  @Column({ type: 'timestamp', default: new Date() })
  updated_at: Date
}

