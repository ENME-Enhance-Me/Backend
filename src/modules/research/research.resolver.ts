import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ResearchService } from './research.service';
import { Research } from './entities/research.entity';
import { CreateResearchInput } from './dto/create-research.input';
import { UpdateResearchInput } from './dto/update-research.input';
import { QuestionService } from '../question/question.service';
import { CreateCompleteResearchInput } from './dto/create-complete-research.input';
import { CreateResearchService } from './research-create.service';
import { PeopleGenreService } from '../user/peopleGenre.service';

@Resolver(() => Research)
export class ResearchResolver {
  constructor(
    private readonly researchService: ResearchService,
    private readonly pgService: PeopleGenreService,
    private readonly compResearchService: CreateResearchService,
    private readonly questionService: QuestionService
    ) {}

  //@Mutation(() => Research,)
  async createResearch(@Args('data') data: CreateResearchInput) {
    return await this.researchService.create(data);
  }

  @Mutation(() => Research, { name: 'createResearch', description: 'Cria uma pesquisa com perguntas e opções de resposta' })
  async createCompleteResearch(@Args('data') data: CreateCompleteResearchInput) {
    return await this.compResearchService.create(data);
  }

  @Query(() => [Research], { name: 'findAllResearchToBrand', description: 'Retorna todas as pesquisas de uma marca' })
  findAlltoBrand(@Args('brandID') brandID: string) {
    return this.researchService.findAllToBrand(brandID);
  }

  //@Query(() => [Research], { name: 'findAllResearch' })
  findAll() {
    return this.researchService.findAll();
  }

  @Query(() => Research, { name: 'findOneResearch' })
  findOne(@Args('id') id: string) {
    return this.researchService.findOne(id);
  }

  // @Mutation(() => Research)
  updateResearch(
    @Args('id') id: string,
    @Args('data') data: UpdateResearchInput
    ) {
    return this.researchService.update(id, data);
  }

  @Mutation(() => Boolean)
  removeResearch(@Args('id') id: string) {
    return this.researchService.remove(id);
  }

  @ResolveField() 
  async brand(@Parent() research: Research){
    const { brandID } = research
    return await this.researchService.brand(brandID);
  }

  @ResolveField() 
  async questions(@Parent() research: Research){
    const { id } = research;
    return await this.questionService.findAlltoResearch(id);
  }

}
