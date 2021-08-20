import { Test, TestingModule } from '@nestjs/testing';
import { MailSenderService } from './mailSender.service';

describe('MailerService', () => {
  let service: MailSenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailSenderService],
    }).compile();

    service = module.get<MailSenderService>(MailSenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});