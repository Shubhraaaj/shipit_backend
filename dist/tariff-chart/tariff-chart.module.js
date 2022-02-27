"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TariffChartModule = void 0;
const common_1 = require("@nestjs/common");
const tariff_chart_service_1 = require("./tariff-chart.service");
const tariff_chart_resolver_1 = require("./tariff-chart.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const tariff_chart_entity_1 = require("./entities/tariff-chart.entity");
const vendor_entity_1 = require("../vendors/entities/vendor.entity");
let TariffChartModule = class TariffChartModule {
};
TariffChartModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tariff_chart_entity_1.TariffChart]), typeorm_1.TypeOrmModule.forFeature([vendor_entity_1.Vendor])],
        providers: [tariff_chart_resolver_1.TariffChartResolver, tariff_chart_service_1.TariffChartService]
    })
], TariffChartModule);
exports.TariffChartModule = TariffChartModule;
//# sourceMappingURL=tariff-chart.module.js.map