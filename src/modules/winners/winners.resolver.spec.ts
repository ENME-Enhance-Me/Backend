import { Test, TestingModule } from '@nestjs/testing';
import { WinnersResolver } from './winners.resolver';
import { WinnersService } from './winners.service';

describe('WinnersResolver', () => {
  let resolver: WinnersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WinnersResolver, WinnersService],
    }).compile();

    resolver = module.get<WinnersResolver>(WinnersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
