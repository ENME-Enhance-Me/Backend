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

  //@Query(() => [Comment], { name: 'findAllComments' })
  findAll() {
    return this.commentsService.findAll();
  }

  // @Query(() => Comment, { name: 'findOneComment' })
  findOne(@Args('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Query(() => [Comment] )
  findAllCommentsToResearch(@Args('ResearchID') researchID: string){
    return this.commentsService.findAllToResearch(researchID);
  }

  // @Mutation(() => Comment)
  updateComment(@Args('data') data: UpdateCommentInput) {
    return this.commentsService.update(data.id, data);
  }

  // @Mutation(() => Boolean)
  removeComment(@Args('id') id: string) {
    return this.commentsService.remove(id);
  }

  @ResolveField()
  async research(@Parent() comment: Comment){
    const { researchID } = comment;
    return await this.commentsService.research(researchID);
  }

  @ResolveField()
  async client(@Parent() comment: Comment){
    const { clientID } = comment;
    return await this.commentsService.client(clientID);
  }
}
