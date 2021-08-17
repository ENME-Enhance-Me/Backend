import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { FindAddressInput } from './dto/find-address.input';

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) { }

  @Mutation(() => Address, {
    name: 'CreateAddressToBrand',
    description: 'Cria um endereço vinculado à uma marca'
  })
  async createAddressToBrand(@Args('data') data: CreateAddressInput) {
    return await this.addressService.createToBrand(data);
  }

  @Mutation(() => Address, {
    name: 'createAddressToClient',
    description: 'Cria um endereço vinculado à um cliente'
  })
  async createAddressToClient(@Args('data') data: CreateAddressInput) {
    return await this.addressService.createToClient(data);
  }

  @Query(() => [Address], {
    name: 'findAllAddress',
    description: 'retorna todos os endereços'
  })
  async findAll() {
    return await this.addressService.findAll();
  }

  @Query(() => Address, {
    name: 'findOneAddress',
    description: 'retorna um endereço pelo ID, pela marca ou pelo cliente'
  })
  async findOne(@Args('data') data: FindAddressInput) {
    return await this.addressService.findOne(data);
  }

  @Mutation(() => Address, {
    name: 'updateAddressToBrand',
    description: 'Atualiza um endereço vinculado à uma marca'
  })
  async updateAddressToBrand(@Args('data') data: UpdateAddressInput) {
    return await this.addressService.updateAddressToBrand(data.ownerID, data);
  }

  @Mutation(() => Address, {
    name: 'updateAddressToClient',
    description: 'Atualiza um endereço vinculado à um cliente'
  })
  async updateAddressToClient(@Args('data') data: UpdateAddressInput) {
    return await this.addressService.updatedAddressToClient(data.ownerID, data);
  }

  @Mutation(() => Boolean, {
    name: 'removeAddress',
    description: 'Apaga um endereço'
  })
  async removeAddress(@Args('id') id: string) {
    return await this.addressService.remove(id);
  }
}
