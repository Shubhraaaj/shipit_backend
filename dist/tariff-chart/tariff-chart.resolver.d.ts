import { TariffChartService } from './tariff-chart.service';
import { TariffChart } from './entities/tariff-chart.entity';
import { CreateTariffChartInput } from './dto/create-tariff-chart.input';
export declare class TariffChartResolver {
    private readonly tariffChartService;
    constructor(tariffChartService: TariffChartService);
    createTariffChart(createTariffChartInput: CreateTariffChartInput): Promise<CreateTariffChartInput>;
    findAll(): Promise<TariffChart[]>;
    findOne(id: string): Promise<TariffChart>;
    updateTariffChart(createTariffChartInput: CreateTariffChartInput): Promise<TariffChart>;
    removeTariffChart(id: string): Promise<TariffChart>;
}
