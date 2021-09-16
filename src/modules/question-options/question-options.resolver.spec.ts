import { Test, TestingModule } from '@nestjs/testing';
import { QuestionOptionsResolver } from './question-options.resolver';
import { QuestionOptionsService } from './question-options.service';

describe('QuestionOptionsResolver', () => {
  let resolver: QuestionOptionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionOptionsResolver, QuestionOptionsService],
    }).compile();

    resolver = module.get<QuestionOptionsResolver>(QuestionOptionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
