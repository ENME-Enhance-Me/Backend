import { Test, TestingModule } from '@nestjs/testing';
import { ClientbrandResolver } from './clientbrand.resolver';
import { ClientbrandService } from './clientbrand.service';

describe('ClientbrandResolver', () => {
  let resolver: ClientbrandResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientbrandResolver, ClientbrandService],
    }).compile();

    resolver = module.get<ClientbrandResolver>(ClientbrandResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
