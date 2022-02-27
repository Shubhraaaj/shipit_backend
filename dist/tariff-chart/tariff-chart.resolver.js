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
exports.TariffChartResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const tariff_chart_service_1 = require("./tariff-chart.service");
const tariff_chart_entity_1 = require("./entities/tariff-chart.entity");
const create_tariff_chart_input_1 = require("./dto/create-tariff-chart.input");
let TariffChartResolver = class TariffChartResolver {
    constructor(tariffChartService) {
        this.tariffChartService = tariffChartService;
    }
    createTariffChart(createTariffChartInput) {
        return this.tariffChartService.create(createTariffChartInput);
    }
    findAll() {
        return this.tariffChartService.findAll();
    }
    findOne(id) {
        return this.tariffChartService.findOne(id);
    }
    updateTariffChart(createTariffChartInput) {
        return this.tariffChartService.update(createTariffChartInput.vendor_id, createTariffChartInput);
    }
    async removeTariffChart(id) {
        return this.tariffChartService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => tariff_chart_entity_1.TariffChart, { name: "uploadTariffChart" }),
    __param(0, (0, graphql_1.Args)('createTariffChartInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tariff_chart_input_1.CreateTariffChartInput]),
    __metadata("design:returntype", void 0)
], TariffChartResolver.prototype, "createTariffChart", null);
__decorate([
    (0, graphql_1.Query)(() => [tariff_chart_entity_1.TariffChart], { name: 'getAllTariffChart' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TariffChartResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => tariff_chart_entity_1.TariffChart, { name: 'getTariffChartByVendorId' }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TariffChartResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => tariff_chart_entity_1.TariffChart, { name: "updateTariffChart" }),
    __param(0, (0, graphql_1.Args)('createTariffChartInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tariff_chart_input_1.CreateTariffChartInput]),
    __metadata("design:returntype", void 0)
], TariffChartResolver.prototype, "updateTariffChart", null);
__decorate([
    (0, graphql_1.Mutation)(() => tariff_chart_entity_1.TariffChart, { name: 'deleteTariffChartById' }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TariffChartResolver.prototype, "removeTariffChart", null);
TariffChartResolver = __decorate([
    (0, graphql_1.Resolver)(() => tariff_chart_entity_1.TariffChart),
    __metadata("design:paramtypes", [tariff_chart_service_1.TariffChartService])
], TariffChartResolver);
exports.TariffChartResolver = TariffChartResolver;
//# sourceMappingURL=tariff-chart.resolver.js.map