import { Test, TestingModule } from '@nestjs/testing';
import { MicroSegmentsService } from './micro-segments.service';

describe('MicroSegmentsService', () => {
  let service: MicroSegmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MicroSegmentsService],
    }).compile();

    service = module.get<MicroSegmentsService>(MicroSegmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
