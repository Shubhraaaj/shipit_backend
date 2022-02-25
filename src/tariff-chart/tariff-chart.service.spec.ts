import { Test, TestingModule } from '@nestjs/testing';
import { TariffChartService } from './tariff-chart.service';

describe('TariffChartService', () => {
  let service: TariffChartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TariffChartService],
    }).compile();

    service = module.get<TariffChartService>(TariffChartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
