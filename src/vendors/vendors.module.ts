import { forwardRef, Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorsResolver } from './vendors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { Auths } from "./entities/auth.entity"
import { CityVendorXref } from './entities/city-vendor-xref.entity';
import { TariffChart } from 'src/tariff-chart/entities/tariff-chart.entity';
import { VendorPagination } from './entities/vendor.pagination.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor]), TypeOrmModule.forFeature([Auths]), TypeOrmModule.forFeature([CityVendorXref]), TypeOrmModule.forFeature([TariffChart]), TypeOrmModule.forFeature([VendorPagination])],
  providers: [VendorsResolver, VendorsService,]
})
export class VendorsModule { }
