import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from 'src/vendors/entities/vendor.entity';
import { Repository } from 'typeorm';
import { CreateTariffChartInput } from './dto/create-tariff-chart.input';
import { UpdateTariffChartInput } from './dto/update-tariff-chart.input';
import { TariffChart } from './entities/tariff-chart.entity';

import * as fs from 'fs'
import * as XLSX from 'xlsx'


@Injectable()
export class TariffChartService {
  constructor(@InjectRepository(TariffChart) private tariffChartRepository: Repository<TariffChart>,
    @InjectRepository(Vendor) private vendorRepository: Repository<Vendor>) { }

  async create(createTariffChartInput: CreateTariffChartInput): Promise<CreateTariffChartInput> {

    let tariffChartUploadedForAVendor = await this.tariffChartRepository.findOne({ vendor_id: createTariffChartInput.vendor_id })
    if (tariffChartUploadedForAVendor) throw new BadRequestException("Tariff Chart Already Uploaded!")
    createTariffChartInput.tariff = createTariffChartInput.tariff.split(',')[1]
    let buff = Buffer.from(createTariffChartInput.tariff, 'base64');
    let filePath = `${createTariffChartInput.vendor_id}.xlxs`
    fs.writeFileSync(filePath, buff);

    var workbook = XLSX.readFile(filePath);
    var sheet_name_list = workbook.SheetNames;
    let chartJsonArr = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
    let tariffChartJson = {}
    createTariffChartInput["distance_1"] = []
    createTariffChartInput["distance_2"] = []
    createTariffChartInput["distance_3"] = []
    createTariffChartInput["distance_4"] = []
    createTariffChartInput["distance_5"] = []
    createTariffChartInput["distance_6"] = []

    for (let chart of chartJsonArr) {
      let tariffKey = chart['0']
      delete chart['0']
      tariffChartJson[tariffKey] = chart
      let keyList = Object.keys(chart)

      for (let key of keyList) {
        if (key.replace(/\s/g, "") === '0-50') {
          createTariffChartInput["distance_1"].push(chart[key])
        }
        else if (key.replace(/\s/g, "") === '51-100') {
          createTariffChartInput["distance_2"].push(chart[key])
        } else if (key.replace(/\s/g, "") === '101-200') {
          createTariffChartInput["distance_3"].push(chart[key])
        } else if (key.replace(/\s/g, "") === '201-350') {
          createTariffChartInput["distance_4"].push(chart[key])
        } else if (key.replace(/\s/g, "") === '351-600') {
          createTariffChartInput["distance_5"].push(chart[key])
        } else if (key.replace(/\s/g, "") === '600+') {
          createTariffChartInput["distance_6"].push(chart[key])
        }

      }

    }

    createTariffChartInput.tariff = JSON.stringify(tariffChartJson)

    fs.unlink(filePath, err => {
      if (err) throw err;
      console.log(`${filePath} was deleted`);
    })
    let tariffChart = this.tariffChartRepository.create(createTariffChartInput)
    let insertedTariffChartDta = this.tariffChartRepository.save(tariffChart)

    return insertedTariffChartDta
  }

  findAll() {
    return this.tariffChartRepository.find()
  }

  async findOne(id: string) {
    let result = await this.tariffChartRepository.findOne({ vendor_id: id })
    if (!result) throw new BadRequestException("Tariff Chart Doesn't exists!")
    return result
  }

  async update(id: string, createTariffChartInput: CreateTariffChartInput) {
    let tariffChartUploadedForAVendor = await this.tariffChartRepository.findOne({ vendor_id: createTariffChartInput.vendor_id })
    if (!tariffChartUploadedForAVendor) throw new BadRequestException("Tariff Chart Doesn't exists!")

    let buff = Buffer.from(createTariffChartInput.tariff, 'base64');
    let filePath = `${createTariffChartInput.vendor_id}.xlxs`
    fs.writeFileSync(filePath, buff);

    var workbook = XLSX.readFile(filePath);
    var sheet_name_list = workbook.SheetNames;
    let chartJsonArr = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
    let tariffChartJson = {}
    createTariffChartInput["distance_1"] = []
    createTariffChartInput["distance_2"] = []
    createTariffChartInput["distance_3"] = []
    createTariffChartInput["distance_4"] = []
    createTariffChartInput["distance_5"] = []
    createTariffChartInput["distance_6"] = []

    for (let chart of chartJsonArr) {
      let tariffKey = chart['0']
      delete chart['0']
      tariffChartJson[tariffKey] = chart
      let keyList = Object.keys(chart)

      for (let key of keyList) {
        if (key.replace(/\s/g, "") === '0-50') {
          createTariffChartInput["distance_1"].push(chart[key])
        }
        else if (key.replace(/\s/g, "") === '51-100') {
          createTariffChartInput["distance_2"].push(chart[key])
        } else if (key.replace(/\s/g, "") === '101-200') {
          createTariffChartInput["distance_3"].push(chart[key])
        } else if (key.replace(/\s/g, "") === '201-350') {
          createTariffChartInput["distance_4"].push(chart[key])
        } else if (key.replace(/\s/g, "") === '351-600') {
          createTariffChartInput["distance_5"].push(chart[key])
        } else if (key.replace(/\s/g, "") === '600+') {
          createTariffChartInput["distance_6"].push(chart[key])
        }

      }

    }

    createTariffChartInput.tariff = JSON.stringify(tariffChartJson)

    fs.unlink(filePath, err => {
      if (err) throw err;
      console.log(`${filePath} was deleted`);
    })

    await this.tariffChartRepository.update({ vendor_id: id }, { ...createTariffChartInput })

    return await this.tariffChartRepository.findOne({ vendor_id: createTariffChartInput.vendor_id })
  }

  async remove(id: string) {
    let existedTariffChart = await this.tariffChartRepository.findOne({ id })
    if (!existedTariffChart) throw new BadRequestException("The tariff doesn't exists!")
    await this.tariffChartRepository.delete(id)
    return existedTariffChart
  }
}
