import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VendorsService } from './vendors.service';
import { Vendor } from './entities/vendor.entity';
import { CreateVendorInput } from './dto/create-vendor.input';
import { UpdateVendorInput } from './dto/update-vendor.input';
import { Auths } from './entities/auth.entity';
import { LoginVendorInput } from './dto/login-vendor.input';
import { CityVendorXref } from './entities/city-vendor-xref.entity'
import { VendorQueryInput } from './dto/vendors-query.input';
import { VendorPagination } from './entities/vendor.pagination.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Vendor)
export class VendorsResolver {
  constructor(private readonly vendorsService: VendorsService) { }

  @Mutation(() => Vendor, { name: "signup" })
  create(@Args('vendorInput') createVendorInput: CreateVendorInput) {
    return this.vendorsService.create(createVendorInput);
  }

  @Query(() => VendorPagination, { name: 'getAllVendors' })
  findAll(@Args('vendorQueryInput') vendorQueryInput: VendorQueryInput) {
    return this.vendorsService.getVendorsByCities(vendorQueryInput);
  }


  @Mutation(() => Auths, { name: "login" })
  login(@Args('loginInput') VendorLoginInput: LoginVendorInput) {
    return this.vendorsService.sign(VendorLoginInput);
  }

  @Query(() => Vendor, { name: 'getVendorProfile' })
  @UseGuards(new AuthGuard)
  findOne(@Args('id') id: string) {
    return this.vendorsService.getVendorProfile(id);
  }

  @Mutation(() => Vendor, { name: "updateProfile" })
  @UseGuards(new AuthGuard)
  update(@Args('updateVendorInput') updateVendorInput: UpdateVendorInput) {
    return this.vendorsService.update(updateVendorInput.vendor_id, updateVendorInput);
  }

  @Mutation(() => Vendor, { name: "deleteVendor" })
  @UseGuards(new AuthGuard)
  removeVendor(@Args('id') id: string) {
    return this.vendorsService.deleteVendor(id);
  }
}
