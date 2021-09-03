import { Module } from '@nestjs/common';
import { QuestionOptionsService } from './question-options.service';
import { QuestionOptionsResolver } from './question-options.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionOption } from './entities/question-option.entity';
import { Question } from '../question/entities/question.entity';
import { QuestionService } from '../question/question.service';
import { QuestionType } from '../question/entities/question-type.entity';
import { ResearchService } from '../research/research.service';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { Research } from '../research/entities/research.entity';
import { Brand } from '../brand/entities/brand.entity';
import { MicroSegment } from '../micro-segments/entities/micro-segment.entity';
import { User } from '../user/entities/user.entity';
import { BrandService } from '../brand/brand.service';
import { UserService } from '../user/user.service';
import { AnswerService } from '../answer/answer.service';
import { Answer } from '../answer/entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, QuestionType, QuestionOption, Answer, Research, Brand, MicroSegment, User])],
  providers: [QuestionOptionsResolver, QuestionOptionsService, AnswerService, QuestionService, ResearchService, CloudinaryService, ResearchService, BrandService, UserService]
})
export class QuestionOptionsModule {}
