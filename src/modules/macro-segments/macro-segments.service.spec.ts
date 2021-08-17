import { Test, TestingModule } from '@nestjs/testing';
import { MacroSegmentsService } from './macro-segments.service';

describe('MacroSegmentsService', () => {
  let service: MacroSegmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MacroSegmentsService],
    }).compile();

    service = module.get<MacroSegmentsService>(MacroSegmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
