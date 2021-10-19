import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ClientbrandService } from './clientbrand.service';
import { Clientbrand } from './entities/clientbrand.entity';
import { CreateClientbrandInput } from './dto/create-clientbrand.input';
import { UpdateClientbrandInput } from './dto/update-clientbrand.input';

@Resolver(() => Clientbrand)
export class ClientbrandResolver {
  constructor(private readonly clientbrandService: ClientbrandService) {}

  @Mutation(() => Clientbrand)
  createClientbrand(@Args('data') data: CreateClientbrandInput) {
    return this.clientbrandService.create(data);
  }

  @Query(() => [Clientbrand], { name: 'findAllClientBrand' })
  findAll() {
    return this.clientbrandService.findAll();
  }

  @Query(() => Clientbrand, { name: 'findOneClientBrand' })
  findOne(@Args('id') id: string) {
    return this.clientbrandService.findOne(id);
  }

  @Mutation(() => Clientbrand)
  updateClientbrand(@Args('data') data: UpdateClientbrandInput) {
    return this.clientbrandService.update(data.id, data);
  }

  @Mutation(() => Clientbrand)
  removeClientbrand(@Args('id') id: string) {
    return this.clientbrandService.remove(id);
  }

  @ResolveField()
  brand(@Parent() clientBrand: Clientbrand ){
    return this.clientbrandService.brand(clientBrand.brandID);
  }

  @ResolveField()
  client(@Parent() clientBrand: Clientbrand ){
    return this.clientbrandService.client(clientBrand.clientID);
  }
}
