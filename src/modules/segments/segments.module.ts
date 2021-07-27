import { Segment } from './entities/segment.entity';
import { Module } from '@nestjs/common';
import { SegmentsService } from './segments.service';
import { SegmentsResolver } from './segments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Segment])],
  providers: [SegmentsService, SegmentsResolver ]
})
export class SegmentsModule { }
