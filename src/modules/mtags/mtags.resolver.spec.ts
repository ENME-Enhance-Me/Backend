import { Test, TestingModule } from '@nestjs/testing';
import { MtagsResolver } from './mtags.resolver';
import { MtagsService } from './mtags.service';

describe('MtagsResolver', () => {
  let resolver: MtagsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MtagsResolver, MtagsService],
    }).compile();

    resolver = module.get<MtagsResolver>(MtagsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
