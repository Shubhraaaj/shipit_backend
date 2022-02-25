// import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Field, ObjectType } from "@nestjs/graphql"
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import * as crypto from 'crypto';
import { TariffChart } from '../../tariff-chart/entities/tariff-chart.entity'

@ObjectType()
@Entity()
export class Vendor {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  vendor_id: string

  @Field()
  @Column({ nullable: true, default: '' })
  tariff_chart_id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column({ unique: true })
  phone_number: string

  @Field()
  @Column({ unique: true })
  email: string

  @Field()
  @Column({ nullable: true, default: '' })
  amount: string


  @Field()
  @Column()
  password: string


  @Field()
  @Column({ nullable: true, default: '' })
  website: string

  @Field()
  @Column({ nullable: true, default: '' })
  address: string

  @Field(() => [String])
  @Column("simple-array", { nullable: true, default: '' })
  service_cities: string[]


  @Field()
  @Column({ nullable: true, default: '' })
  logo: string

  @Field()
  @CreateDateColumn({ type: 'timestamp', default: new Date() })
  created_at: Date

  @Field()
  @UpdateDateColumn({ type: 'timestamp', default: new Date() })
  updated_at: Date

  // @OneToOne(() => TariffChart, tariffChart => tariffChart.vendor)
  // @JoinColumn({ name: "tariff_chart_id" })
  // tariff_chart: TariffChart;
}

