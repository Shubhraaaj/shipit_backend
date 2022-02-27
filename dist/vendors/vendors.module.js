"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorsModule = void 0;
const common_1 = require("@nestjs/common");
const vendors_service_1 = require("./vendors.service");
const vendors_resolver_1 = require("./vendors.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const vendor_entity_1 = require("./entities/vendor.entity");
const auth_entity_1 = require("./entities/auth.entity");
const city_vendor_xref_entity_1 = require("./entities/city-vendor-xref.entity");
const tariff_chart_entity_1 = require("../tariff-chart/entities/tariff-chart.entity");
const vendor_pagination_entity_1 = require("./entities/vendor.pagination.entity");
let VendorsModule = class VendorsModule {
};
VendorsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([vendor_entity_1.Vendor]), typeorm_1.TypeOrmModule.forFeature([auth_entity_1.Auths]), typeorm_1.TypeOrmModule.forFeature([city_vendor_xref_entity_1.CityVendorXref]), typeorm_1.TypeOrmModule.forFeature([tariff_chart_entity_1.TariffChart]), typeorm_1.TypeOrmModule.forFeature([vendor_pagination_entity_1.VendorPagination])
        ],
        providers: [vendors_resolver_1.VendorsResolver, vendors_service_1.VendorsService,]
    })
], VendorsModule);
exports.VendorsModule = VendorsModule;
//# sourceMappingURL=vendors.module.js.map