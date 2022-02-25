import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import { CreateVendorInput } from './dto/create-vendor.input';
import { UpdateVendorInput } from './dto/update-vendor.input';
import { Vendor } from "./entities/vendor.entity"
import { LoginVendorInput } from "./dto/login-vendor.input"
import { Auths } from './entities/auth.entity';
import { CityVendorXref } from './entities/city-vendor-xref.entity'
import * as fs from 'fs'
import * as path from 'path'
import { TariffChart } from 'src/tariff-chart/entities/tariff-chart.entity';
import { VendorQueryInput } from './dto/vendors-query.input';
import { VendorPagination } from './entities/vendor.pagination.entity';
console.log(".env", process.env.MAIL_SERVICE)
const citiesList = {
  "Delhi": {
    "Delhi": 0,
    "Chandigarh": 60,
    "Jaipur": 110,
    "Manali": 60,
    "Mumbai": 160,
    "Hydrabad": 150,
    "Chennai": 250,
    "Kolkata": 150,
    "Lucknow": 100,
    "Indore": 130
  },
  "Chandigarh": {
    "Delhi": 100,
    "Chandigarh": 0,
    "Jaipur": 120,
    "Manali": 50,
    "Mumbai": 1100,
    "Hydrabad": 1300,
    "Chennai": 2100,
    "Kolkata": 1400,
    "Lucknow": 400,
    "Indore": 250
  },
  "Jaipur": {
    "Delhi": 200,
    "Chandigarh": 120,
    "Jaipur": 0,
    "Manali": 70,
    "Mumbai": 1200,
    "Hydrabad": 800,
    "Chennai": 1900,
    "Kolkata": 1600,
    "Lucknow": 500,
    "Indore": 350
  },
  "Manali": {
    "Delhi": 150,
    "Chandigarh": 130,
    "Jaipur": 50,
    "Manali": 0,
    "Mumbai": 1300,
    "Hydrabad": 1000,
    "Chennai": 2200,
    "Kolkata": 1500,
    "Lucknow": 550,
    "Indore": 440
  },
  "Mumbai": {
    "Delhi": 1000,
    "Chandigarh": 110,
    "Jaipur": 1200,
    "Manali": 1200,
    "Mumbai": 0,
    "Hydrabad": 1000,
    "Chennai": 1000,
    "Kolkata": 2000,
    "Lucknow": 1100,
    "Indore": 1000
  },
  "Hydrabad": {
    "Delhi": 1000,
    "Chandigarh": 1200,
    "Jaipur": 800,
    "Manali": 800,
    "Mumbai": 1000,
    "Hydrabad": 0,
    "Chennai": 750,
    "Kolkata": 2000,
    "Lucknow": 1200,
    "Indore": 1300
  },
  "Chennai": {
    "Delhi": 2000,
    "Chandigarh": 2100,
    "Jaipur": 1900,
    "Manali": 2200,
    "Mumbai": 100,
    "Hydrabad": 750,
    "Chennai": 0,
    "Kolkata": 2200,
    "Lucknow": 1800,
    "Indore": 1800
  },
  "Kolkata": {
    "Delhi": 1500,
    "Chandigarh": 400,
    "Jaipur": 1600,
    "Manali": 1500,
    "Mumbai": 2000,
    "Hydrabad": 2000,
    "Chennai": 2200,
    "Kolkata": 0,
    "Lucknow": 800,
    "Indore": 600
  },
  "Lucknow": {
    "Delhi": 300,
    "Chandigarh": 499,
    "Jaipur": 500,
    "Manali": 550,
    "Mumbai": 1100,
    "Hydrabad": 1200,
    "Chennai": 2200,
    "Kolkata": 800,
    "Lucknow": 0,
    "Indore": 400
  },
  "Indore": {
    "Delhi": 200,
    "Chandigarh": 250,
    "Jaipur": 350,
    "Manali": 440,
    "Mumbai": 1000,
    "Hydrabad": 1300,
    "Chennai": 1800,
    "Kolkata": 600,
    "Lucknow": 400,
    "Indore": 0
  }
}

Object.freeze(citiesList)
@Injectable()
export class VendorsService {
  constructor(@InjectRepository(Vendor) private vendorRepository: Repository<Vendor>
    , @InjectRepository(Auths) private authsRepository: Repository<Auths>,
    @InjectRepository(CityVendorXref) private cityVendorRepository: Repository<CityVendorXref>,
    @InjectRepository(TariffChart) private tariffChartRepository: Repository<TariffChart>,
    @InjectRepository(VendorPagination) private vendorPaginationRepository: Repository<VendorPagination>
  ) { }

  async findAll(): Promise<Vendor[]> {

    return this.vendorRepository.find({ relations: ["tariff_chart"] })
  }

  async create(vendorInput: CreateVendorInput): Promise<Vendor> {

    const salt = await bcrypt.genSalt();
    vendorInput.password = await bcrypt.hash(vendorInput.password, salt);
    let existEmail = await this.vendorRepository.findOne({ email: vendorInput.email })
    if (existEmail != undefined) throw new BadRequestException("Email Already Exists!")

    let existPhone = await this.vendorRepository.findOne({ phone_number: vendorInput.phone_number })
    if (existPhone != undefined) throw new BadRequestException("Phone Number Already Exists!")
    let vend = this.vendorRepository.create(vendorInput)
    return this.vendorRepository.save(vend)
  }

  async sign(loginInput: LoginVendorInput): Promise<Auths | { status: number, message: string }> {

    let existUser = await this.vendorRepository.findOne({ email: loginInput.user_email })
    if (!existUser) throw new NotFoundException("User Not Found!");

    const isPasswordMatch = await bcrypt.compare(loginInput.password, existUser.password);

    if (isPasswordMatch) {
      const accessToken = jwt.sign({
        data: JSON.stringify(existUser)
      }, 'secret', { expiresIn: '24h' });

      let authData = { user_email: loginInput.user_email, auth_token: accessToken, vendor_id: existUser.vendor_id }
      let authDbData = this.authsRepository.create(authData)

      return this.authsRepository.save(authDbData)
    }

    throw new BadRequestException("Invalid Credential!")

  }

  async update(vendor_id: string, updateVendorInput: UpdateVendorInput): Promise<Vendor> {

    let existedvendor = await this.vendorRepository.findOne({ vendor_id })
    if (existedvendor == undefined) throw new BadRequestException("Vendor Doesn't Exists!")

    if (existedvendor.email !== updateVendorInput.email) {
      let existEmail = await this.vendorRepository.findOne({ email: updateVendorInput.email })
      if (existEmail != undefined) throw new BadRequestException("Email Already Exists!")
    } else {
      delete updateVendorInput.email
    }

    if (existedvendor.phone_number !== updateVendorInput.phone_number) {
      let existedPhone = await this.vendorRepository.findOne({ phone_number: updateVendorInput.phone_number })
      if (existedPhone != undefined) throw new BadRequestException("Phone Number Already Exists!")
    } else {
      delete updateVendorInput.phone_number
    }

    const bufferForLogo = Buffer.from(updateVendorInput.logo, "base64");
    let logoName = `${vendor_id}.jpg`
    let logoPath = path.join(__dirname, "..", "..", "public", "vendor_profile", logoName)

    fs.writeFileSync(logoPath, bufferForLogo);
    let citiesInsertData = []
    for (let city of updateVendorInput.service_cities) {
      citiesInsertData.push({ vendor_id, city: city.toLowerCase() })
    }
    await this.cityVendorRepository.insert(citiesInsertData)
    updateVendorInput.updated_at = new Date()
    await this.vendorRepository.update({ vendor_id }, { ...existedvendor, ...updateVendorInput })

    return { ...existedvendor, ...updateVendorInput }

  }

  async getVendorProfile(vendor_id: string) {

    let profileData = await this.vendorRepository.findOne({ vendor_id })
    if (!profileData) throw new BadRequestException("Vendor Doesn't Exists!")
    let tariffData = await this.tariffChartRepository.findOne({ vendor_id })
    if (tariffData) profileData.tariff_chart_id = String(tariffData.priority_factor)
    if (!profileData) throw new BadRequestException("Vendor Doesn't Exists!")
    return profileData
  }

  async deleteVendor(vendor_id: string) {
    let profileData = await this.vendorRepository.findOne({ vendor_id })
    if (!profileData) throw new BadRequestException("Vendor Doesn't Exists!")


    let logoName = `${vendor_id}.jpg`
    let logoPath = path.join(__dirname, "..", "..", "public", "vendor_profile", logoName)

    fs.unlinkSync(logoPath)
    return profileData
  }

  async getVendorsByCities(vendorQueryInput: VendorQueryInput): Promise<VendorPagination> {
    if (vendorQueryInput.srcCity === vendorQueryInput.destCity) throw new BadRequestException("Source and Destination Cities should be different!")
    vendorQueryInput.destCity = vendorQueryInput.destCity.charAt(0).toUpperCase() + vendorQueryInput.destCity.slice(1);
    vendorQueryInput.srcCity = vendorQueryInput.srcCity.charAt(0).toUpperCase() + vendorQueryInput.srcCity.slice(1);

    let distance = citiesList[vendorQueryInput.srcCity][vendorQueryInput.destCity]
    let distanceArrayIndex = 0
    if (vendorQueryInput.weight > 0.0 && vendorQueryInput.weight <= 5.0) {
      distanceArrayIndex = 0
    } else if (vendorQueryInput.weight >= 5.1 && vendorQueryInput.weight <= 10.0) {
      distanceArrayIndex = 1
    } else if (vendorQueryInput.weight >= 10.1 && vendorQueryInput.weight <= 15.0) {
      distanceArrayIndex = 2
    } else if (vendorQueryInput.weight >= 15.1 && vendorQueryInput.weight <= 20.0) {
      distanceArrayIndex = 3
    } else if (vendorQueryInput.weight > 15.1) {
      throw new BadRequestException("only less than 15.1 KG allowed!")
    }

    let srcVendors = await this.cityVendorRepository.find({ city: vendorQueryInput.srcCity.toLowerCase() })
    console.log("srcVendors", srcVendors)
    let srcVendorsIds = srcVendors.map(v => v.vendor_id)

    let destVendors = await this.cityVendorRepository.find({ city: vendorQueryInput.destCity.toLowerCase() })
    console.log("destVendors", destVendors)
    let vendorsId = new Set(destVendors.filter(v => srcVendorsIds.includes(v.vendor_id)).map(v => v.vendor_id))

    let findVendorPromise = []
    for (let id of vendorsId) {
      findVendorPromise.push(this.vendorRepository.find({
        where: {
          vendor_id: id,
        }
      }))
    }

    let vendors = await Promise.all(findVendorPromise)
    // console.log("vendors", vendors)
    let vendorsResult = []


    for (let v of vendors) {
      vendorsResult = [...vendorsResult, ...v]
    }

    for (let v of vendorsResult) {
      let tariffChart = await this.tariffChartRepository.findOne({ vendor_id: v.vendor_id })
      console.log("tariffChart", tariffChart)
      if (tariffChart) {

        let distanceArray = []
        if (distance > 0 && distance < 51) {
          distanceArray = tariffChart.distance_1
        } else if (distance >= 51 && distance < 101) {
          distanceArray = tariffChart.distance_2
        } else if (distance >= 101 && distance < 200) {
          distanceArray = tariffChart.distance_3
        } else if (distance >= 201 && distance < 351) {
          distanceArray = tariffChart.distance_4
        } else if (distance >= 351 && distance < 601) {
          distanceArray = tariffChart.distance_5
        } else if (distance >= 601) {
          distanceArray = tariffChart.distance_6
        }
        if (vendorQueryInput.type.toLowerCase() === "priority") {
          v.amount = JSON.stringify({ amount: distanceArray[distanceArrayIndex] * tariffChart.priority_factor, distance })
        } else {
          v.amount = JSON.stringify({ amount: distanceArray[distanceArrayIndex], distance })
        }

      } else {
        console.log("error ", `Tariff Chart is Not Uploaded for vendor Id (${v.vendor_id}) `)
      }
    }

    if (vendorQueryInput.name) {
      vendorsResult = vendorsResult.filter(v => v.name.includes(vendorQueryInput.name))
    }

    // implementing sort functionality
    if (vendorQueryInput.sortBy === "name") {

      vendorsResult = [...vendorsResult.sort((a, b) => b.name - a.name)]

    } else if (vendorQueryInput.sortBy === "price") {
      vendorsResult = vendorsResult.sort((a, b) => JSON.parse(b.amount).amount - JSON.parse(a.amount).amount)
    } else {
      /// 
    }

    return { result: JSON.stringify(vendorsResult), total_elements: vendorsResult.length, id: "123" }
  }

}
///ddd