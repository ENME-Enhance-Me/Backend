import { Test, TestingModule } from '@nestjs/testing';
import { MacroSegmentsResolver } from './macro-segments.resolver';
import { MacroSegmentsService } from './macro-segments.service';

describe('MacroSegmentsResolver', () => {
  let resolver: MacroSegmentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MacroSegmentsResolver, MacroSegmentsService],
    }).compile();

    resolver = module.get<MacroSegmentsResolver>(MacroSegmentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
