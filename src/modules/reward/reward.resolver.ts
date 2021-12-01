import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { RewardService } from './reward.service';
import { Reward } from './entities/reward.entity';
import { CreateRewardInput } from './dto/create-reward.input';
import { UpdateRewardInput } from './dto/update-reward.input';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver(() => Reward)
export class RewardResolver {
  constructor(private readonly rewardService: RewardService) { }

  //@Mutation(() => Reward)
  createReward(
    @Args('data') data: CreateRewardInput,
    @Args({ name: 'file', nullable: true, type: () => GraphQLUpload }) file: FileUpload
    ) {
    return this.rewardService.create(data, file);
  }

  //@Query(() => [Reward], { name: 'findAllReward' })
  findAll() {
    return this.rewardService.findAll();
  }
  
  @Query(() => [Reward], { name: 'findAllRewardToBrand' })
  findAllToBrand(@Args('brandID') brandID: string) {
    return this.rewardService.findAllToBrand(brandID);
  }

  @Query(() => Reward, { name: 'findOneReward' })
  findOne(@Args('id') id: string) {
    return this.rewardService.findOne(id);
  }

  // @Mutation(() => Reward)
  updateReward(@Args('data') data: UpdateRewardInput) {
    return this.rewardService.update(data.id, data);
  }

  // @Mutation(() => Reward)
  removeReward(@Args('id') id: string) {
    return this.rewardService.remove(id);
  }

  @ResolveField()
  async brand(@Parent() reward: Reward ){
    return await this.rewardService.brand(reward.brandID);
  }
}
