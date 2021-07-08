import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { UserService } from '../user/user.service';
import { FindClientInput } from './dto/find-client.input';

@Resolver(() => Client)
export class ClientsResolver {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly userService: UserService,
  ) { }

  @Mutation(() => Client, {
    description: 'Cria um usuário e um cliente; Email não pode se repetir'
  })
  createClient(@Args('data') data: CreateClientInput) {
    return this.clientsService.create(data);
  }

  @Query(() => [Client], { 
    name: 'FindAllClients',
    description: 'Retorna todos os clientes'
  })
  findAll() {
    return this.clientsService.findAll();
  }

  @Query(() => Client, {
    name: 'FindOneclient',
    description: 'encontra um cliente pelos campos de usuario, id de cliente ou firstName e LastName juntos'
  })
  findOne(@Args('data') data: FindClientInput) {
    return this.clientsService.find(data);
  }

  @Query(() => Client, { 
    name: 'findOneClientById',
    description: 'Encontra um cliente pelo ID'
  })
  async findOnebyId(@Args('id') id: string) {
    return await this.clientsService.findOne(id);
  }

  @ResolveField()
  async user(@Parent() client: Client) {
    const { userID } = client;
    return await this.userService.findOne(userID);
  }

  @Mutation(() => Client, {
    description: 'atualiza um ou mais campos do cliente ou do usuário relacionado'
  })
  updateClient(@Args('id') id: string, @Args('updateClientInput') data: UpdateClientInput) {
    return this.clientsService.update(id, data);
  }

  @Mutation(() => Boolean, {
    description:'Remove um cliente e o usuário relacionado'
  })
  removeClient(@Args('id') id: string) {
    return this.clientsService.remove(id);
  }
}
