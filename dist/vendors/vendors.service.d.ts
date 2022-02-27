import { Repository } from 'typeorm';
import { CreateVendorInput } from './dto/create-vendor.input';
import { UpdateVendorInput } from './dto/update-vendor.input';
import { Vendor } from "./entities/vendor.entity";
import { LoginVendorInput } from "./dto/login-vendor.input";
import { Auths } from './entities/auth.entity';
import { CityVendorXref } from './entities/city-vendor-xref.entity';
import { TariffChart } from 'src/tariff-chart/entities/tariff-chart.entity';
import { VendorQueryInput } from './dto/vendors-query.input';
import { VendorPagination } from './entities/vendor.pagination.entity';
export declare class VendorsService {
    private vendorRepository;
    private authsRepository;
    private cityVendorRepository;
    private tariffChartRepository;
    private vendorPaginationRepository;
    constructor(vendorRepository: Repository<Vendor>, authsRepository: Repository<Auths>, cityVendorRepository: Repository<CityVendorXref>, tariffChartRepository: Repository<TariffChart>, vendorPaginationRepository: Repository<VendorPagination>);
    findAll(): Promise<Vendor[]>;
    create(vendorInput: CreateVendorInput): Promise<Vendor>;
    sign(loginInput: LoginVendorInput): Promise<Auths | {
        status: number;
        message: string;
    }>;
    update(vendor_id: string, updateVendorInput: UpdateVendorInput): Promise<Vendor>;
    getVendorProfile(vendor_id: string): Promise<Vendor>;
    deleteVendor(vendor_id: string): Promise<Vendor>;
    getVendorsByCities(vendorQueryInput: VendorQueryInput): Promise<VendorPagination>;
}
