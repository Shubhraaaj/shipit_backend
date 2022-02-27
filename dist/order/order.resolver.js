"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const order_service_1 = require("./order.service");
const order_entity_1 = require("./entities/order.entity");
const create_order_input_1 = require("./dto/create-order.input");
const update_order_input_1 = require("./dto/update-order.input");
const order_matrix_entity_1 = require("./entities/order.matrix.entity");
let OrderResolver = class OrderResolver {
    constructor(orderService) {
        this.orderService = orderService;
    }
    createOrder(createOrderInput) {
        return this.orderService.create(createOrderInput);
    }
    findAll(status, vendor_id) {
        return this.orderService.findAll(status, vendor_id);
    }
    findOne(id) {
        return this.orderService.findOne(id);
    }
    updateOrder(updateOrderInput) {
        return this.orderService.update(updateOrderInput.order_no, updateOrderInput);
    }
    removeOrder(id) {
        return this.orderService.remove(id);
    }
    trackorderByTrackId(id) {
        return this.orderService.trackorderByTrackId(id);
    }
    getOrderMatrics(vendor_id, filterDate) {
        return this.orderService.orderMatrix(vendor_id, filterDate);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => order_entity_1.Order, { name: "CreateOrder" }),
    __param(0, (0, graphql_1.Args)('createOrderInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_input_1.CreateOrderInput]),
    __metadata("design:returntype", void 0)
], OrderResolver.prototype, "createOrder", null);
__decorate([
    (0, graphql_1.Query)(() => [order_entity_1.Order], { name: 'getOrders' }),
    __param(0, (0, graphql_1.Args)('status')),
    __param(1, (0, graphql_1.Args)('vendor_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], OrderResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => order_entity_1.Order, { name: 'getOrderByOrderNo' }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => order_entity_1.Order, { name: "modifyOrderByOrderNo" }),
    __param(0, (0, graphql_1.Args)('updateOrderInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_order_input_1.UpdateOrderInput]),
    __metadata("design:returntype", void 0)
], OrderResolver.prototype, "updateOrder", null);
__decorate([
    (0, graphql_1.Mutation)(() => order_entity_1.Order, { name: "DeleteOrderByOrderNo" }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderResolver.prototype, "removeOrder", null);
__decorate([
    (0, graphql_1.Query)(() => order_entity_1.Order, { name: 'trackOrderByTrackId' }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderResolver.prototype, "trackorderByTrackId", null);
__decorate([
    (0, graphql_1.Query)(() => order_matrix_entity_1.OrderMatrix, { name: 'getOrdersMatrix' }),
    __param(0, (0, graphql_1.Args)('vendor_id')),
    __param(1, (0, graphql_1.Args)('filterDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], OrderResolver.prototype, "getOrderMatrics", null);
OrderResolver = __decorate([
    (0, graphql_1.Resolver)(() => order_entity_1.Order),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderResolver);
exports.OrderResolver = OrderResolver;
//# sourceMappingURL=order.resolver.js.map