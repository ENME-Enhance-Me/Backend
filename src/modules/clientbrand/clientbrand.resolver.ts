import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClientbrandService } from './clientbrand.service';
import { Clientbrand } from './entities/clientbrand.entity';
import { CreateClientbrandInput } from './dto/create-clientbrand.input';
import { UpdateClientbrandInput } from './dto/update-clientbrand.input';

@Resolver(() => Clientbrand)
export class ClientbrandResolver {
  constructor(private readonly clientbrandService: ClientbrandService) {}

  @Mutation(() => Clientbrand)
  createClientbrand(@Args('createClientbrandInput') createClientbrandInput: CreateClientbrandInput) {
    return this.clientbrandService.create(createClientbrandInput);
  }

  @Query(() => [Clientbrand], { name: 'clientbrand' })
  findAll() {
    return this.clientbrandService.findAll();
  }

  @Query(() => Clientbrand, { name: 'clientbrand' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.clientbrandService.findOne(id);
  }

  @Mutation(() => Clientbrand)
  updateClientbrand(@Args('updateClientbrandInput') updateClientbrandInput: UpdateClientbrandInput) {
    return this.clientbrandService.update(updateClientbrandInput.id, updateClientbrandInput);
  }

  @Mutation(() => Clientbrand)
  removeClientbrand(@Args('id', { type: () => Int }) id: number) {
    return this.clientbrandService.remove(id);
  }
}
