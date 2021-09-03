import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Mutation(() => Answer)
  createAnswer(@Args('data') data: CreateAnswerInput) {
    return this.answerService.create(data);
  }

  @Query(() => [Answer], { name: 'findAllAnswer' })
  findAll() {
    return this.answerService.findAll();
  }

  @Query(() => Answer, { name: 'findOneAnswer' })
  findOne(@Args('id') id: string) {
    return this.answerService.findOne(id);
  }

  @Query(() => [Answer] )
  findAllAnswerToQuestionOption(@Args('QuestionOptionID') QuestionOptionID: string){
    return this.answerService.findAllToQuestionOption(QuestionOptionID);
  }

  @Mutation(() => Answer)
  updateAnswer(@Args('data') data: UpdateAnswerInput) {
    return this.answerService.update(data.id, data);
  }

  @Mutation(() => Boolean)
  removeAnswer(@Args('id') id: string) {
    return this.answerService.remove(id);
  }

  @ResolveField()
  async questionOption(@Parent() answer: Answer){
    const { questionOptionID } = answer;
    return await this.answerService.questionOption(questionOptionID);
  }
}
