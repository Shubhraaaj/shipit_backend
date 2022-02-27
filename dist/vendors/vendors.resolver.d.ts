import { VendorsService } from './vendors.service';
import { Vendor } from './entities/vendor.entity';
import { CreateVendorInput } from './dto/create-vendor.input';
import { UpdateVendorInput } from './dto/update-vendor.input';
import { Auths } from './entities/auth.entity';
import { LoginVendorInput } from './dto/login-vendor.input';
import { VendorQueryInput } from './dto/vendors-query.input';
import { VendorPagination } from './entities/vendor.pagination.entity';
export declare class VendorsResolver {
    private readonly vendorsService;
    constructor(vendorsService: VendorsService);
    create(createVendorInput: CreateVendorInput): Promise<Vendor>;
    findAll(vendorQueryInput: VendorQueryInput): Promise<VendorPagination>;
    login(VendorLoginInput: LoginVendorInput): Promise<Auths | {
        status: number;
        message: string;
    }>;
    findOne(id: string): Promise<Vendor>;
    update(updateVendorInput: UpdateVendorInput): Promise<Vendor>;
    removeVendor(id: string): Promise<Vendor>;
}
