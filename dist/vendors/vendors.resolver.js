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
exports.VendorsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const vendors_service_1 = require("./vendors.service");
const vendor_entity_1 = require("./entities/vendor.entity");
const create_vendor_input_1 = require("./dto/create-vendor.input");
const update_vendor_input_1 = require("./dto/update-vendor.input");
const auth_entity_1 = require("./entities/auth.entity");
const login_vendor_input_1 = require("./dto/login-vendor.input");
const vendors_query_input_1 = require("./dto/vendors-query.input");
const vendor_pagination_entity_1 = require("./entities/vendor.pagination.entity");
let VendorsResolver = class VendorsResolver {
    constructor(vendorsService) {
        this.vendorsService = vendorsService;
    }
    create(createVendorInput) {
        return this.vendorsService.create(createVendorInput);
    }
    findAll(vendorQueryInput) {
        return this.vendorsService.getVendorsByCities(vendorQueryInput);
    }
    login(VendorLoginInput) {
        return this.vendorsService.sign(VendorLoginInput);
    }
    findOne(id) {
        return this.vendorsService.getVendorProfile(id);
    }
    update(updateVendorInput) {
        return this.vendorsService.update(updateVendorInput.vendor_id, updateVendorInput);
    }
    removeVendor(id) {
        return this.vendorsService.deleteVendor(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => vendor_entity_1.Vendor, { name: "signup" }),
    __param(0, (0, graphql_1.Args)('vendorInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vendor_input_1.CreateVendorInput]),
    __metadata("design:returntype", void 0)
], VendorsResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)(() => vendor_pagination_entity_1.VendorPagination, { name: 'getAllVendors' }),
    __param(0, (0, graphql_1.Args)('vendorQueryInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendors_query_input_1.VendorQueryInput]),
    __metadata("design:returntype", void 0)
], VendorsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Mutation)(() => auth_entity_1.Auths, { name: "login" }),
    __param(0, (0, graphql_1.Args)('loginInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_vendor_input_1.LoginVendorInput]),
    __metadata("design:returntype", void 0)
], VendorsResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Query)(() => vendor_entity_1.Vendor, { name: 'getVendorProfile' }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VendorsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => vendor_entity_1.Vendor, { name: "updateProfile" }),
    __param(0, (0, graphql_1.Args)('updateVendorInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_vendor_input_1.UpdateVendorInput]),
    __metadata("design:returntype", void 0)
], VendorsResolver.prototype, "update", null);
__decorate([
    (0, graphql_1.Mutation)(() => vendor_entity_1.Vendor, { name: "deleteVendor" }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VendorsResolver.prototype, "removeVendor", null);
VendorsResolver = __decorate([
    (0, graphql_1.Resolver)(() => vendor_entity_1.Vendor),
    __metadata("design:paramtypes", [vendors_service_1.VendorsService])
], VendorsResolver);
exports.VendorsResolver = VendorsResolver;
//# sourceMappingURL=vendors.resolver.js.map