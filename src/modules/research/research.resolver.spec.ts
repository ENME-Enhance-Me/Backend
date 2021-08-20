import { Test, TestingModule } from '@nestjs/testing';
import { ResearchResolver } from './research.resolver';
import { ResearchService } from './research.service';

describe('ResearchResolver', () => {
  let resolver: ResearchResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearchResolver, ResearchService],
    }).compile();

    resolver = module.get<ResearchResolver>(ResearchResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
