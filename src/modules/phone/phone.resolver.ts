import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PhoneService } from './phone.service';
import { Phone } from './entities/phone.entity';
import { CreatePhoneInput } from './dto/create-phone.input';
import { UpdatePhoneInput } from './dto/update-phone.input';
import { UserService } from '../user/user.service';

@Resolver(() => Phone)
export class PhoneResolver {
  constructor(
    private readonly phoneService: PhoneService,
    private readonly userService: UserService
  ) { }

  @Mutation(() => Phone)
  createPhone(@Args('data') data: CreatePhoneInput) {
    return this.phoneService.create(data);
  }

  @Query(() => [Phone], { name: 'findAllPhones' })
  findAll() {
    return this.phoneService.findAll();
  }

  @Query(() => Phone, { name: 'findOnePhone' })
  findOne(@Args('id') id: string) {
    return this.phoneService.findOne(id);
  }

  @ResolveField()
  async user(@Parent() phone: Phone) {
    const { userID } = phone;
    return await this.userService.findOne(userID);
  }

  @Mutation(() => Phone)
  updatePhone(
    @Args('id') id: string,
    @Args('data') data: UpdatePhoneInput
  ) {
    return this.phoneService.update(id, data);
  }

  @Mutation(() => Boolean)
  removePhone(@Args('id') id: string) {
    return this.phoneService.remove(id);
  }
}
