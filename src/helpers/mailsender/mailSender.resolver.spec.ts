import { Test, TestingModule } from '@nestjs/testing';
import { MailSenderResolver } from './mailSender.resolver';

describe('MailsenderResolver', () => {
  let resolver: MailSenderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailSenderResolver],
    }).compile();

    resolver = module.get<MailSenderResolver>(MailSenderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
