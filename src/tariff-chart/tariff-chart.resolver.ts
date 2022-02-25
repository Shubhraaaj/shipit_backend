import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TariffChartService } from './tariff-chart.service';
import { TariffChart } from './entities/tariff-chart.entity';
import { CreateTariffChartInput } from './dto/create-tariff-chart.input';
import { UpdateTariffChartInput } from './dto/update-tariff-chart.input';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => TariffChart)
export class TariffChartResolver {
  constructor(private readonly tariffChartService: TariffChartService) { }

  @Mutation(() => TariffChart, { name: "uploadTariffChart" })
  @UseGuards(new AuthGuard)
  createTariffChart(@Args('createTariffChartInput') createTariffChartInput: CreateTariffChartInput) {
    return this.tariffChartService.create(createTariffChartInput);
  }

  @Query(() => [TariffChart], { name: 'getAllTariffChart' })
  findAll() {
    return this.tariffChartService.findAll();
  }

  @Query(() => TariffChart, { name: 'getTariffChartByVendorId' })
  @UseGuards(new AuthGuard)
  findOne(@Args('id') id: string) {
    return this.tariffChartService.findOne(id);
  }

  @Mutation(() => TariffChart, { name: "updateTariffChart" })
  @UseGuards(new AuthGuard)
  updateTariffChart(@Args('createTariffChartInput') createTariffChartInput: CreateTariffChartInput) {
    return this.tariffChartService.update(createTariffChartInput.vendor_id, createTariffChartInput);
  }

  @Mutation(() => TariffChart, { name: 'deleteTariffChartById' })
  @UseGuards(new AuthGuard)
  async removeTariffChart(@Args('id') id: string) {
    return this.tariffChartService.remove(id);
  }
}
