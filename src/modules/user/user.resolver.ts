import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => User, {
    description: 'Cria um usuário'
  })
  createUser(@Args('data') data: CreateUserInput) {
    return this.userService.create(data);
  }

  @Query(() => [User], {
    name: 'findAllUser',
    description: 'Busca todos os usuários no banco'
  })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query(() => User, {
    name: 'findOneUser',
    description: 'Encontra um usuário por qualquer campo dele'
  })
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User,{
    description: 'Atualiza um ou mais campos de um usuário'
  })
  updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => Boolean, {
    description: 'Remove um usuário do banco de dados'
  })
  removeUser(@Args('id') id: string) {
    return this.userService.remove(id);
  }
}
