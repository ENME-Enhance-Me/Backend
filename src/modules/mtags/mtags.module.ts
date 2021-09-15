import { Module } from '@nestjs/common';
import { MtagsService } from './mtags.service';
import { MtagsResolver } from './mtags.resolver';

@Module({
  providers: [MtagsResolver, MtagsService]
})
export class MtagsModule {}
