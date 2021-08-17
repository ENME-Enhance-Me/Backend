import { Module } from '@nestjs/common';
import { MicroSegmentsService } from './micro-segments.service';
import { MicroSegmentsResolver } from './micro-segments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MacroSegment } from '../macro-segments/entities/macro-segment.entity';
import { MicroSegment } from './entities/micro-segment.entity';
import { MacroSegmentsService } from '../macro-segments/macro-segments.service';

@Module({
  imports: [TypeOrmModule.forFeature([MacroSegment, MicroSegment])],
  providers: [MicroSegmentsResolver, MicroSegmentsService, MacroSegmentsService]
})
export class MicroSegmentsModule {}
