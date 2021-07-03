import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { UserService } from 'src/modules/user/user.service';
import { FindBrandInput } from './dto/find-brand.input';

@Resolver(() => Brand)
export class BrandResolver {
  constructor(
    private readonly brandService: BrandService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Brand)
  async createBrand(@Args('data') data: CreateBrandInput) {
    return await this.brandService.create(data);
  }

  @Query(() => [Brand], { name: 'findAllBrands' })
  async findAll() {
    return await this.brandService.findAll();
  }

  @Query(() => Brand, { name: 'findOnebrandbyId' })
  async findOnebyId(@Args('id') id: string) {
    return await this.brandService.findOne(id);
  }

  @Query(() => Brand, { name: 'findOnebrand' })
  async findOne(@Args('data') data: FindBrandInput) {
    return await this.brandService.find(data);
  }

  @ResolveField()
  async user(@Parent() brand: Brand) {
    const { userId } = brand;
    return await this.userService.findOne(userId);
  }

  @Mutation(() => Brand)
  async updateBrand(
    @Args('id') id: string,
    @Args('data') data: UpdateBrandInput,
  ) {
    return await this.brandService.update(id, data);
  }

  @Mutation(() => Boolean)
  async removeBrand(@Args('id') id: string) {
    return await this.brandService.remove(id);
  }
}
