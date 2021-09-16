import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { MtagsService } from './mtags.service';
import { Mtag } from './entities/mtag.entity';
import { CreateMtagInput } from './dto/create-mtag.input';
import { UpdateMtagInput } from './dto/update-mtag.input';

@Resolver(() => Mtag)
export class MtagsResolver {
  constructor(private readonly mtagsService: MtagsService) {}

  @Mutation(() => Mtag)
  createMtag(@Args('data') data: CreateMtagInput) {
    return this.mtagsService.create(data);
  }

  @Query(() => [Mtag], { name: 'FindAllMTags' })
  findAll() {
    return this.mtagsService.findAll();
  }

  @Query(() => [Mtag], { name: 'FindAllMTagsToBrand' })
  findAlltoBrand(@Args('brandID') brandID: string) {
    return this.mtagsService.findAllToBrand(brandID);
  }

  @Query(() => [Mtag], { name: 'findMtagsToResearch' })
  findMtagsToResearch(@Args('researchID') researchID: string) {
    return this.mtagsService.findAllToResearch(researchID);
  }

  @Query(() => Mtag, { name: 'FindOneMTag' })
  findOne(@Args('id') id: string) {
    return this.mtagsService.findOne(id);
  }

  @Mutation(() => Mtag)
  updateMtag(@Args('data') data: UpdateMtagInput) {
    return this.mtagsService.update(data.id, data);
  }

  @Mutation(() => Mtag)
  removeMtag(@Args('id') id: string) {
    return this.mtagsService.remove(id);
  }

  @ResolveField()
  brand(@Parent() mTag: Mtag){
    return this.mtagsService.brand(mTag.brandID)
  }
}
