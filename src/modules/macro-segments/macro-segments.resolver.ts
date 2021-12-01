import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { MacroSegmentsService } from './macro-segments.service';
import { MacroSegment } from './entities/macro-segment.entity';
import { CreateMacroSegmentInput } from './dto/create-macro-segment.input';
import { UpdateMacroSegmentInput } from './dto/update-macro-segment.input';
import { MicroSegmentsService } from '../micro-segments/micro-segments.service';

@Resolver(() => MacroSegment)
export class MacroSegmentsResolver {
  constructor(
    private readonly macroSegmentsService: MacroSegmentsService,
    private readonly microSegmentsService: MicroSegmentsService
    ) {}

  //@Mutation(() => MacroSegment)
  async createMacroSegment(@Args('data') data: CreateMacroSegmentInput) {
    return await this.macroSegmentsService.create(data);
  }

  @Query(() => [MacroSegment], { name: 'findAllMacroSegments' })
  findAll() {
    return this.macroSegmentsService.findAll();
  }

  // @Query(() => MacroSegment, { name: 'findOneMacroSegment' })
  findOne(@Args('id') id: string) {
    return this.macroSegmentsService.findOne(id);
  }
  //@Mutation(() => MacroSegment)
  updateMacroSegment(@Args('data') data: UpdateMacroSegmentInput) {
    return this.macroSegmentsService.update(data.id, data);
  }

  @ResolveField()
  async microSegments(@Parent() macro: MacroSegment){
    const { id } = macro;
    return await this.microSegmentsService.findAlltoMacro(id);
  }
  //@Mutation(() => Boolean)
  removeMacroSegment(@Args('id') id: string) {
    return this.macroSegmentsService.remove(id);
  }

  // @Mutation(() => MacroSegment)
  async connectMicrosToMacro(
    @Args('macroID') macroID: string,
    @Args({ name: 'microIds', type: () => [String] }) microIds: string[]
    ){
    return await this.macroSegmentsService.connectMicrosToMacro(macroID, microIds);
  }

}
