import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { Vendor } from 'src/vendors/entities/vendor.entity';
export declare class OrderService {
    private orderRepository;
    private vendorRepository;
    constructor(orderRepository: Repository<Order>, vendorRepository: Repository<Vendor>);
    findAll(status: string, vendor_id: string): Promise<Order[]>;
    orderMatrix(vendor_id: string, filterYear: number): Promise<{
        numberOfOrdersByStatus: string;
        topSourceCities: string;
        topDestCities: string;
        monthwiseOrders: string;
    }>;
    create(createOrderInput: CreateOrderInput): Promise<Order>;
    findOne(id: string): Promise<Order>;
    update(id: string, updateOrderInput: UpdateOrderInput): Promise<Order>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    trackorderByTrackId(id: string): Promise<Order>;
}
