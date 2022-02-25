import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { LoginUserInput } from '../user/dto/user-login.input';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) { }

  @Mutation(() => Order, { name: "CreateOrder" })
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'getOrders' })
  findAll(@Args('status') status: string, @Args('vendor_id') vendor_id: string) {
    return this.orderService.findAll(status, vendor_id);
  }

  @Query(() => Order, { name: 'getOrderByOrderNo' })
  findOne(@Args('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Mutation(() => Order, { name: "modifyOrderByOrderNo" })
  @UseGuards(new AuthGuard)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.orderService.update(updateOrderInput.order_no, updateOrderInput);
  }

  @Mutation(() => Order, { name: "DeleteOrderByOrderNo" })
  removeOrder(@Args('id') id: string) {
    return this.orderService.remove(id);
  }

  @Query(() => Order, { name: 'trackOrderByTrackId' })
  trackorderByTrackId(@Args('id') id: string) {
    return this.orderService.trackorderByTrackId(id);
  }



}
