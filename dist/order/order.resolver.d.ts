import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
export declare class OrderResolver {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderInput: CreateOrderInput): Promise<Order>;
    findAll(status: string, vendor_id: string): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    updateOrder(updateOrderInput: UpdateOrderInput): Promise<Order>;
    removeOrder(id: string): Promise<import("typeorm").DeleteResult>;
    trackorderByTrackId(id: string): Promise<Order>;
    getOrderMatrics(vendor_id: string, filterDate: number): Promise<{
        numberOfOrdersByStatus: string;
        topSourceCities: string;
        topDestCities: string;
        monthwiseOrders: string;
    }>;
}
