import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ResearchService } from './research.service';
import { Research } from './entities/research.entity';
import { CreateResearchInput } from './dto/create-research.input';
import { UpdateResearchInput } from './dto/update-research.input';

@Resolver(() => Research)
export class ResearchResolver {
  constructor(private readonly researchService: ResearchService) {}

  @Mutation(() => Research)
  async createResearch(@Args('data') data: CreateResearchInput) {
    return await this.researchService.create(data);
  }

  @Query(() => [Research], { name: 'findAllResearchToBrand' })
  findAlltoBrand(@Args('brandID') brandID: string) {
    return this.researchService.findAllToBrand(brandID);
  }

  @Query(() => [Research], { name: 'findAllResearch' })
  findAll() {
    return this.researchService.findAll();
  }

  @Query(() => Research, { name: 'findOneResearch' })
  findOne(@Args('id') id: string) {
    return this.researchService.findOne(id);
  }

  @Mutation(() => Research)
  updateResearch(
    @Args('id') id: string,
    @Args('data') data: UpdateResearchInput
    ) {
    return this.researchService.update(id, data);
  }

  @Mutation(() => Research)
  removeResearch(@Args('id') id: string) {
    return this.researchService.remove(id);
  }

  @ResolveField() 
  async brand(@Parent() research: Research){
    const { brandID } = research
    return await this.researchService.brand(brandID);
  }
}
