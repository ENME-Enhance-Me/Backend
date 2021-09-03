import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../question/entities/question.entity';
import { Answer } from './entities/answer.entity';
import { QuestionType } from '../question/entities/question-type.entity';
import { QuestionOption } from '../question-options/entities/question-option.entity';
import { Research } from '../research/entities/research.entity';
import { Brand } from '../brand/entities/brand.entity';
import { MicroSegment } from '../micro-segments/entities/micro-segment.entity';
import { User } from '../user/entities/user.entity';
import { QuestionOptionsResolver } from '../question-options/question-options.resolver';
import { QuestionOptionsService } from '../question-options/question-options.service';
import { QuestionService } from '../question/question.service';
import { ResearchService } from '../research/research.service';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { BrandService } from '../brand/brand.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Question, QuestionType, QuestionOption, Research, Brand, MicroSegment, User])],
  providers: [AnswerService, AnswerResolver, QuestionOptionsService, QuestionService, CloudinaryService, ResearchService, BrandService, UserService]
})
export class AnswerModule {}
