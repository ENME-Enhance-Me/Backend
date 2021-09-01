import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { QuestionOptionsService } from './question-options.service';
import { QuestionOption } from './entities/question-option.entity';
import { CreateQuestionOptionInput } from './dto/create-question-option.input';
import { UpdateQuestionOptionInput } from './dto/update-question-option.input';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver(() => QuestionOption)
export class QuestionOptionsResolver {
  constructor(private readonly questionOptionsService: QuestionOptionsService) { }

  @Mutation(() => QuestionOption)
  createQuestionOption(@Args('data') data: CreateQuestionOptionInput,
  @Args({name: 'image', nullable: true, type: () => GraphQLUpload}) image: FileUpload ) {
    return this.questionOptionsService.create(data, image);
  }

  @Query(() => [QuestionOption], { name: 'FindAllQuestionOptions' })
  findAll() {
    return this.questionOptionsService.findAll();
  }

  @Query(() => QuestionOption, { name: 'FindOneQuestionOption' })
  findOne(@Args('id') id: string) {
    return this.questionOptionsService.findOne(id);
  }

  @Query(() => [QuestionOption], { name: 'findAllOptionsToQuestion' })
  findAlltoResearch(@Args('questionID') questionID: string) {
    return this.questionOptionsService.findAllOptionsToQuestion(questionID);
  }

  @Mutation(() => QuestionOption)
  updateQuestionOption(
    @Args('id') id: string,
    @Args('data') data: UpdateQuestionOptionInput
  ) {
    return this.questionOptionsService.update(id, data);
  }

  @Mutation(() => Boolean)
  removeQuestionOption(@Args('id') id: string) {
    return this.questionOptionsService.remove(id);
  }

  @ResolveField()
  async question(@Parent() option: QuestionOption){
    const { questionID } = option;
    return await this.questionOptionsService.question(questionID);
  }
}
