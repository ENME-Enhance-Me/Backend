import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { QuestionType } from './entities/question-type.entity';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) { }

  @Mutation(() => Question)
  createQuestion(@Args('data') data: CreateQuestionInput) {
    return this.questionService.create(data);
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

  @Mutation(() => Question)
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
}
