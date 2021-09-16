import { Test, TestingModule } from '@nestjs/testing';
import { MtagsService } from './mtags.service';

describe('MtagsService', () => {
  let service: MtagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MtagsService],
    }).compile();

    service = module.get<MtagsService>(MtagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
