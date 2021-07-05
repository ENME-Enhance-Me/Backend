import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { UserService } from '../user/user.service';

@Resolver(() => Client)
export class ClientsResolver {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly userService: UserService,
  ) { }

  @Mutation(() => Client)
  createClient(@Args('createClientInput') createClientInput: CreateClientInput) {
    return this.clientsService.create(createClientInput);
  }

  @Query(() => [Client], { name: 'FindAllClients' })
  findAll() {
    return this.clientsService.findAll();
  }

  @Query(() => Client, { name: 'FindOneclient' })
  findOne(@Args('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @ResolveField()
  async user(@Parent() client: Client) {
    const { userId } = client;
    return await this.userService.findOne(userId);
  }

  @Mutation(() => Client)
  updateClient(@Args('id') id: string, @Args('updateClientInput') data: UpdateClientInput) {
    return this.clientsService.update(id, data);
  }

  @Mutation(() => Client)
  removeClient(@Args('id') id: string) {
    return this.clientsService.remove(id);
  }
}
