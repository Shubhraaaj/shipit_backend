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
exports.TariffChartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vendor_entity_1 = require("../vendors/entities/vendor.entity");
const typeorm_2 = require("typeorm");
const tariff_chart_entity_1 = require("./entities/tariff-chart.entity");
const fs = require("fs");
const XLSX = require("xlsx");
let TariffChartService = class TariffChartService {
    constructor(tariffChartRepository, vendorRepository) {
        this.tariffChartRepository = tariffChartRepository;
        this.vendorRepository = vendorRepository;
    }
    async create(createTariffChartInput) {
        let tariffChartUploadedForAVendor = await this.tariffChartRepository.findOne({ vendor_id: createTariffChartInput.vendor_id });
        if (tariffChartUploadedForAVendor)
            throw new common_1.BadRequestException("Tariff Chart Already Uploaded!");
        createTariffChartInput.tariff = createTariffChartInput.tariff.split(',')[1];
        let buff = Buffer.from(createTariffChartInput.tariff, 'base64');
        let filePath = `${createTariffChartInput.vendor_id}.xlxs`;
        fs.writeFileSync(filePath, buff);
        var workbook = XLSX.readFile(filePath);
        var sheet_name_list = workbook.SheetNames;
        let chartJsonArr = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        let tariffChartJson = {};
        createTariffChartInput["distance_1"] = [];
        createTariffChartInput["distance_2"] = [];
        createTariffChartInput["distance_3"] = [];
        createTariffChartInput["distance_4"] = [];
        createTariffChartInput["distance_5"] = [];
        createTariffChartInput["distance_6"] = [];
        for (let chart of chartJsonArr) {
            let tariffKey = chart['0'];
            delete chart['0'];
            tariffChartJson[tariffKey] = chart;
            let keyList = Object.keys(chart);
            for (let key of keyList) {
                if (key.replace(/\s/g, "") === '0-50') {
                    createTariffChartInput["distance_1"].push(chart[key]);
                }
                else if (key.replace(/\s/g, "") === '51-100') {
                    createTariffChartInput["distance_2"].push(chart[key]);
                }
                else if (key.replace(/\s/g, "") === '101-200') {
                    createTariffChartInput["distance_3"].push(chart[key]);
                }
                else if (key.replace(/\s/g, "") === '201-350') {
                    createTariffChartInput["distance_4"].push(chart[key]);
                }
                else if (key.replace(/\s/g, "") === '351-600') {
                    createTariffChartInput["distance_5"].push(chart[key]);
                }
                else if (key.replace(/\s/g, "") === '600+') {
                    createTariffChartInput["distance_6"].push(chart[key]);
                }
            }
        }
        createTariffChartInput.tariff = JSON.stringify(tariffChartJson);
        fs.unlink(filePath, err => {
            if (err)
                throw err;
            console.log(`${filePath} was deleted`);
        });
        let tariffChart = this.tariffChartRepository.create(createTariffChartInput);
        let insertedTariffChartDta = this.tariffChartRepository.save(tariffChart);
        return insertedTariffChartDta;
    }
    findAll() {
        return this.tariffChartRepository.find();
    }
    async findOne(id) {
        let result = await this.tariffChartRepository.findOne({ vendor_id: id });
        if (!result)
            throw new common_1.BadRequestException("Tariff Chart Doesn't exists!");
        return result;
    }
    async update(id, createTariffChartInput) {
        let tariffChartUploadedForAVendor = await this.tariffChartRepository.findOne({ vendor_id: createTariffChartInput.vendor_id });
        if (!tariffChartUploadedForAVendor)
            throw new common_1.BadRequestException("Tariff Chart Doesn't exists!");
        let buff = Buffer.from(createTariffChartInput.tariff, 'base64');
        let filePath = `${createTariffChartInput.vendor_id}.xlxs`;
        fs.writeFileSync(filePath, buff);
        var workbook = XLSX.readFile(filePath);
        var sheet_name_list = workbook.SheetNames;
        let chartJsonArr = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        let tariffChartJson = {};
        createTariffChartInput["distance_1"] = [];
        createTariffChartInput["distance_2"] = [];
        createTariffChartInput["distance_3"] = [];
        createTariffChartInput["distance_4"] = [];
        createTariffChartInput["distance_5"] = [];
        createTariffChartInput["distance_6"] = [];
        for (let chart of chartJsonArr) {
            let tariffKey = chart['0'];
            delete chart['0'];
            tariffChartJson[tariffKey] = chart;
            let keyList = Object.keys(chart);
            for (let key of keyList) {
                if (key.replace(/\s/g, "") === '0-50') {
                    createTariffChartInput["distance_1"].push(chart[key]);
                }
                else if (key.replace(/\s/g, "") === '51-100') {
                    createTariffChartInput["distance_2"].push(chart[key]);
                }
                else if (key.replace(/\s/g, "") === '101-200') {
                    createTariffChartInput["distance_3"].push(chart[key]);
                }
                else if (key.replace(/\s/g, "") === '201-350') {
                    createTariffChartInput["distance_4"].push(chart[key]);
                }
                else if (key.replace(/\s/g, "") === '351-600') {
                    createTariffChartInput["distance_5"].push(chart[key]);
                }
                else if (key.replace(/\s/g, "") === '600+') {
                    createTariffChartInput["distance_6"].push(chart[key]);
                }
            }
        }
        createTariffChartInput.tariff = JSON.stringify(tariffChartJson);
        fs.unlink(filePath, err => {
            if (err)
                throw err;
            console.log(`${filePath} was deleted`);
        });
        await this.tariffChartRepository.update({ vendor_id: id }, Object.assign({}, createTariffChartInput));
        return await this.tariffChartRepository.findOne({ vendor_id: createTariffChartInput.vendor_id });
    }
    async remove(id) {
        let existedTariffChart = await this.tariffChartRepository.findOne({ id });
        if (!existedTariffChart)
            throw new common_1.BadRequestException("The tariff doesn't exists!");
        await this.tariffChartRepository.delete(id);
        return existedTariffChart;
    }
};
TariffChartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tariff_chart_entity_1.TariffChart)),
    __param(1, (0, typeorm_1.InjectRepository)(vendor_entity_1.Vendor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TariffChartService);
exports.TariffChartService = TariffChartService;
//# sourceMappingURL=tariff-chart.service.js.map