import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MicroSegmentsService } from './micro-segments.service';
import { MicroSegment } from './entities/micro-segment.entity';
import { CreateMicroSegmentInput } from './dto/create-micro-segment.input';
import { UpdateMicroSegmentInput } from './dto/update-micro-segment.input';

@Resolver(() => MicroSegment)
export class MicroSegmentsResolver {
  constructor(private readonly microSegmentsService: MicroSegmentsService) {}

  @Mutation(() => MicroSegment)
  createMicroSegment(@Args('data') data: CreateMicroSegmentInput) {
    return this.microSegmentsService.create(data);
  }

  @Query(() => [MicroSegment], { name: 'findAllMicroSegments' })
  findAll() {
    return this.microSegmentsService.findAll();
  }

  @Query(() => MicroSegment, { name: 'findOneMicroSegment' })
  findOne(@Args('id') id: string) {
    return this.microSegmentsService.findOne(id);
  }

  @Mutation(() => MicroSegment)
  updateMicroSegment(@Args('data') data: UpdateMicroSegmentInput) {
    return this.microSegmentsService.update(data.id, data);
  }

  @Mutation(() => Boolean)
  removeMicroSegment(@Args('id') id: string) {
    return this.microSegmentsService.remove(id);
  }
}
