import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Vendor } from 'src/vendors/entities/vendor.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Order]), TypeOrmModule.forFeature([Vendor]),],
  providers: [OrderResolver, OrderService]
})
export class OrderModule { }
