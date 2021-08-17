import { Test, TestingModule } from '@nestjs/testing';
import { MicroSegmentsResolver } from './micro-segments.resolver';
import { MicroSegmentsService } from './micro-segments.service';

describe('MicroSegmentsResolver', () => {
  let resolver: MicroSegmentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MicroSegmentsResolver, MicroSegmentsService],
    }).compile();

    resolver = module.get<MicroSegmentsResolver>(MicroSegmentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
