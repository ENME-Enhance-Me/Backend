import { Module } from '@nestjs/common';
import { MacroSegmentsService } from './macro-segments.service';
import { MacroSegmentsResolver } from './macro-segments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MacroSegment } from './entities/macro-segment.entity';
import { MicroSegment } from '../micro-segments/entities/micro-segment.entity';
import { MicroSegmentsService } from '../micro-segments/micro-segments.service';

@Module({
  imports: [TypeOrmModule.forFeature([MacroSegment, MicroSegment])],
  providers: [MacroSegmentsResolver, MacroSegmentsService, MicroSegmentsService]
})
export class MacroSegmentsModule {}
