import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  createComment(@Args('data') data: CreateCommentInput) {
    return this.commentsService.create(data);
  }

  @Query(() => [Comment], { name: 'findAllComments' })
  findAll() {
    return this.commentsService.findAll();
  }

  @Query(() => Comment, { name: 'findOneComment' })
  findOne(@Args('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Query(() => [Comment] )
  findAllCommentsToQuestionOption(@Args('QuestionOptionID') QuestionOptionID: string){
    return this.commentsService.findAllToQuestionOption(QuestionOptionID);
  }

  @Mutation(() => Comment)
  updateComment(@Args('data') data: UpdateCommentInput) {
    return this.commentsService.update(data.id, data);
  }

  @Mutation(() => Boolean)
  removeComment(@Args('id') id: string) {
    return this.commentsService.remove(id);
  }

  @ResolveField()
  async questionOption(@Parent() comment: Comment){
    const { questionOptionID } = comment;
    return await this.commentsService.questionOption(questionOptionID);
  }

  @ResolveField()
  async answer(@Parent() comment: Comment){
    const { answerID } = comment;
    return await this.commentsService.answer(answerID);
  }
}
