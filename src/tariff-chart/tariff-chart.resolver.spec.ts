import { Test, TestingModule } from '@nestjs/testing';
import { TariffChartResolver } from './tariff-chart.resolver';
import { TariffChartService } from './tariff-chart.service';

describe('TariffChartResolver', () => {
  let resolver: TariffChartResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TariffChartResolver, TariffChartService],
    }).compile();

    resolver = module.get<TariffChartResolver>(TariffChartResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
