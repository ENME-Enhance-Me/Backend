import { Module } from '@nestjs/common';
import { WinnersService } from './winners.service';
import { WinnersResolver } from './winners.resolver';

@Module({
  providers: [WinnersResolver, WinnersService]
})
export class WinnersModule {}
