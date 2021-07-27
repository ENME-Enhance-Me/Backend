import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SegmentsService } from './segments.service';
import { Segment } from './entities/segment.entity';
import { CreateSegmentInput } from './dto/create-segment.input';
import { UpdateSegmentInput } from './dto/update-segment.input';

@Resolver(() => Segment)
export class SegmentsResolver {
  constructor(private readonly segmentsService: SegmentsService) { }

  @Mutation(() => Segment)
  async createMacroSegment(@Args('data') data: CreateSegmentInput) {
    return await this.segmentsService.createMacro(data);
  }

  @Mutation(() => Segment)
  async createMicroSegment(
    @Args('macroID') macroID: string,
    @Args('data', { type: () => [CreateSegmentInput] }) data: CreateSegmentInput[]
  ) {
    return await this.segmentsService.createMicros(macroID, data);
  }

  @Query(() => [Segment], { name: 'findAllMacroSegments' })
  async findAllMacro() {
    return await this.segmentsService.findAllMacro();
  }

  @Query(() => [Segment], { name: 'findAllSegments' })
  async findAll() {
    return await this.segmentsService.findAll();
  }

  @ResolveField()
  async microSegments(@Parent() segment: Segment) {
    return await this.segmentsService.findAllMicro(segment);
  }

  @Query(() => Segment, { name: 'findOneSegment' })
  async findOne(@Args('id') id: string) {
    return await this.segmentsService.findOne(id);
  }

  @Mutation(() => Segment)
  async updateSegment(@Args('data') data: UpdateSegmentInput) {
    return await this.segmentsService.update(data.id, data);
  }

  @Mutation(() => Boolean)
  async removeSegment(@Args('id') id: string) {
    return await this.segmentsService.remove(id);
  }
}
