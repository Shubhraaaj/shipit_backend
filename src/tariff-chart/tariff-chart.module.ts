import { forwardRef, Module } from '@nestjs/common';
import { TariffChartService } from './tariff-chart.service';
import { TariffChartResolver } from './tariff-chart.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TariffChart } from './entities/tariff-chart.entity';
import { Vendor } from 'src/vendors/entities/vendor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TariffChart]), TypeOrmModule.forFeature([Vendor])],
  providers: [TariffChartResolver, TariffChartService]
})
export class TariffChartModule { }
