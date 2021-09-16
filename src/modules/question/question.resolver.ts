import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { QuestionType } from './entities/question-type.entity';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { QuestionOptionsService } from '../question-options/question-options.service';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(
    private readonly questionService: QuestionService,
    private readonly qOptionService: QuestionOptionsService) { }

  @Mutation(() => Question)
  createQuestion(
    @Args('data') data: CreateQuestionInput,
    @Args({name: 'image', nullable: true, type: () => GraphQLUpload}) image: FileUpload ) {
    return this.questionService.create(data, image);
  }

  @Mutation(() => QuestionType)
  createQuestionType(@Args('type') type: string) {
    return this.questionService.createQuestionType(type);
  }

  @Query(() => [QuestionType], { name: 'findAllQuestionType' })
  findAllQuestionType() {
    return this.questionService.findAllTipos();
  }

  @Query(() => [Question], { name: 'findAllQuestion' })
  findAll() {
    return this.questionService.findAll();
  }

  @Query(() => [Question], { name: 'findAllQuestionToResearch' })
  findAlltoResearch(@Args('researchID') researchID: string) {
    return this.questionService.findAlltoResearch(researchID);
  }

  @Query(() => Question, { name: 'findOneQuestion' })
  findOne(@Args('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Mutation(() => Question)
  updateQuestion(
    @Args('id') id: string,
    @Args('data') data: UpdateQuestionInput
  ) {
    return this.questionService.update(id, data);
  }

  @Mutation(() => Boolean)
  removeQuestion(@Args('id') id: string) {
    return this.questionService.remove(id);
  }

  @ResolveField()
  async research(@Parent() question: Question){
    const { researchID } = question;
    return await this.questionService.research(researchID);
  }

  @ResolveField()
  async questionType(@Parent() question: Question){
    const { questionTypeID } = question;
    return await this.questionService.questionType(questionTypeID);
  }

  @ResolveField()
  async options(@Parent() question: Question){
    const { id } = question;
    return await this.qOptionService.findAllOptionsToQuestion(id);
  }
}
