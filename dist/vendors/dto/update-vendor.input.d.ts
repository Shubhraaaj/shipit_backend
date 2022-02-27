import { CreateVendorInput } from './create-vendor.input';
declare const UpdateVendorInput_base: import("@nestjs/common").Type<Partial<CreateVendorInput>>;
export declare class UpdateVendorInput extends UpdateVendorInput_base {
    vendor_id: string;
    name: string;
    phone_number: string;
    email: string;
    website: string;
    address: string;
    service_cities: string[];
    tariff_chart_id: string;
    logo: string;
    created_at: Date;
    updated_at: Date;
}
export {};
