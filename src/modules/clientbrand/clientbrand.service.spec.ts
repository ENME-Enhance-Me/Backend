import { Test, TestingModule } from '@nestjs/testing';
import { ClientbrandService } from './clientbrand.service';

describe('ClientbrandService', () => {
  let service: ClientbrandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientbrandService],
    }).compile();

    service = module.get<ClientbrandService>(ClientbrandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
