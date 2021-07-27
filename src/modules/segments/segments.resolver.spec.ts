import { Test, TestingModule } from '@nestjs/testing';
import { SegmentsResolver } from './segments.resolver';
import { SegmentsService } from './segments.service';

describe('SegmentsResolver', () => {
  let resolver: SegmentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SegmentsResolver, SegmentsService],
    }).compile();

    resolver = module.get<SegmentsResolver>(SegmentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
