import { Vendor } from 'src/vendors/entities/vendor.entity';
import { Repository } from 'typeorm';
import { CreateTariffChartInput } from './dto/create-tariff-chart.input';
import { TariffChart } from './entities/tariff-chart.entity';
export declare class TariffChartService {
    private tariffChartRepository;
    private vendorRepository;
    constructor(tariffChartRepository: Repository<TariffChart>, vendorRepository: Repository<Vendor>);
    create(createTariffChartInput: CreateTariffChartInput): Promise<CreateTariffChartInput>;
    findAll(): Promise<TariffChart[]>;
    findOne(id: string): Promise<TariffChart>;
    update(id: string, createTariffChartInput: CreateTariffChartInput): Promise<TariffChart>;
    remove(id: string): Promise<TariffChart>;
}
