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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateOrderInput = class CreateOrderInput {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "sender", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "receiver", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "pickup_date_time", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "created_by", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "vendor_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "weight", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "priority", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "weight_unit", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "destination_city", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "source_city", void 0);
CreateOrderInput = __decorate([
    (0, graphql_1.InputType)()
], CreateOrderInput);
exports.CreateOrderInput = CreateOrderInput;
//# sourceMappingURL=create-order.input.js.map