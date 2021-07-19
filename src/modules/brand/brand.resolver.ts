import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { UserService } from 'src/modules/user/user.service';
import { FindBrandInput } from './dto/find-brand.input';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { CreateUserInput } from '../user/dto/create-user.input';
import { User } from '../user/entities/user.entity';

@Resolver(() => Brand)
export class BrandResolver {
  constructor(
    private readonly brandService: BrandService,
    private readonly userService: UserService,
  ) { }

  @Mutation(() => Brand, {
    description: 'Cria uma marca e um usuário vinculados'
  })
  async createBrand(
    @Args('data') data: CreateBrandInput,
    @Args({ name: 'avatarBrand', nullable: true, type: () => GraphQLUpload }) avatarBrand: FileUpload,
    @Args({ name: 'avatarUser', nullable: true, type: () => GraphQLUpload }) avatarUser: FileUpload
  ) {
    return await this.brandService.create(data, avatarBrand, avatarUser);
  }

  @Query(() => [Brand], {
    name: 'findAllBrands',
    description: 'Busca todas as marcas'
  })
  async findAll() {
    return await this.brandService.findAll();
  }

  @Query(() => Brand, {
    name: 'findOneBrandById',
    description: 'Retorna uma marca através da busca por um id'
  })
  async findOnebyId(@Args('id') id: string) {
    return await this.brandService.findOne(id);
  }

  @Query(() => Brand, {
    name: 'findOneBrand',
    description: 'Retorna uma marca pela busca de qualquer campo'
  })
  async findOne(@Args('data') data: FindBrandInput) {
    return await this.brandService.find(data);
  }

  @ResolveField()
  async users(@Parent() brand: Brand) {
    return await this.userService.findMany(brand);
  }

  @Mutation(() => User, {
    description: 'Cria um novo usuário conectado à uma marca'
  })
  async CreateUserToBrand(
    @Args('brandID') id: string,
    @Args('data') data: CreateUserInput,
    @Args({ name: 'avatar', nullable: true, type: () => GraphQLUpload }) avatar: FileUpload
  ) {
    const brand = await this.brandService.findOne(id);
    return await this.userService.create(data, avatar, brand);
  }

  @Mutation(() => Brand, {
    description: 'Atualiza uma marca e um usuário vinculado a ela'
  })
  async updateBrand(
    @Args('id') id: string,
    @Args('data') data: UpdateBrandInput,
  ) {
    return await this.brandService.update(id, data);
  }

  @Mutation(() => Boolean, {
    description: 'Remove uma marca e o usuário vinculado'
  })
  async removeBrand(@Args('id') id: string) {
    return await this.brandService.remove(id);
  }
}
