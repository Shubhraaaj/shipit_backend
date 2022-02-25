// import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Field, ObjectType } from "@nestjs/graphql"
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Vendor } from "src/vendors/entities/vendor.entity";
import { forwardRef } from "@nestjs/common";

@ObjectType()
@Entity()
export class TariffChart {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ type: "json" })
  tariff: string

  @Field(() => [Number])
  @Column("simple-array", { nullable: true })
  distance_1: number[]

  @Field(() => [Number])
  @Column("simple-array", { nullable: true })
  distance_2: number[]

  @Field(() => [Number])
  @Column("simple-array", { nullable: true })
  distance_3: number[]

  @Field(() => [Number])
  @Column("simple-array", { nullable: true })
  distance_4: number[]

  @Field(() => [Number])
  @Column("simple-array", { nullable: true })
  distance_5: number[]

  @Field(() => [Number])
  @Column("simple-array", { nullable: true })
  distance_6: number[]

  @Field()
  @Column('uuid')
  vendor_id: string


  @Field()
  @Column({ nullable: true, type: "decimal" })
  priority_factor: number

  @Field()
  @Column({ type: 'timestamp', default: new Date() })
  created_at: Date

  @Field()
  @Column({ type: 'timestamp', default: new Date() })
  updated_at: Date

  // @OneToOne(() => Vendor, vendor => vendor.tariff_chart)
  // @JoinColumn({ name: "vender_id" })
  // vendor: Vendor;
}



