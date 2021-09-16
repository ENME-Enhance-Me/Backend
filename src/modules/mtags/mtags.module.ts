import { Module } from '@nestjs/common';
import { MtagsService } from './mtags.service';
import { MtagsResolver } from './mtags.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mtag } from './entities/mtag.entity';
import { Question } from '../question/entities/question.entity';
import { QuestionType } from '../question/entities/question-type.entity';
import { QuestionOption } from '../question-options/entities/question-option.entity';
import { Answer } from '../answer/entities/answer.entity';
import { Research } from '../research/entities/research.entity';
import { Brand } from '../brand/entities/brand.entity';
import { MicroSegment } from '../micro-segments/entities/micro-segment.entity';
import { User } from '../user/entities/user.entity';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { AnswerService } from '../answer/answer.service';
import { BrandService } from '../brand/brand.service';
import { QuestionOptionsService } from '../question-options/question-options.service';
import { QuestionService } from '../question/question.service';
import { ResearchService } from '../research/research.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mtag, Question, QuestionType, QuestionOption, Answer, Research, Brand, MicroSegment, User])],
  providers: [MtagsResolver, MtagsService, QuestionOptionsService, AnswerService, QuestionService, ResearchService, CloudinaryService, ResearchService, BrandService, UserService]
})
export class MtagsModule {}
