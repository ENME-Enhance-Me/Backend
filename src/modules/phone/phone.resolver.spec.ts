import { Test, TestingModule } from '@nestjs/testing';
import { PhoneResolver } from './phone.resolver';
import { PhoneService } from './phone.service';

describe('PhoneResolver', () => {
  let resolver: PhoneResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhoneResolver, PhoneService],
    }).compile();

    resolver = module.get<PhoneResolver>(PhoneResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
