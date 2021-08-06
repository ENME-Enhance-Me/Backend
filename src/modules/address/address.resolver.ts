import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { FindAddressInput } from './dto/find-address.input';

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Mutation(() => Address)
  async createAddressToBrand(@Args('data') data: CreateAddressInput) {
    return await this.addressService.createToBrand(data);
  }

  @Mutation(() => Address)
  async createAddressToClient(@Args('data') data: CreateAddressInput) {
    return await this.addressService.createToClient(data);
  }

  @Query(() => [Address], { name: 'findAllAddress' })
  async findAll() {
    return await this.addressService.findAll();
  }

  @Query(() => Address, { name: 'findOneAddress' })
  async findOne(@Args('data') data: FindAddressInput) {
    return await this.addressService.findOne(data);
  }

  @Mutation(() => Address)
  async updateAddressToBrand(@Args('data') data: UpdateAddressInput) {
    return await this.addressService.updateBrand(data.ownerID, data);
  }

  @Mutation(() => Address)
  async updateAddressToClient(@Args('data') data: UpdateAddressInput) {
    return await this.addressService.updatedClient(data.ownerID, data);
  }

  @Mutation(() => Boolean)
  async removeAddress(@Args('id') id: string) {
    return await this.addressService.remove(id);
  }
}
