import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionType } from './entities/question-type.entity';
import { ResearchService } from '../research/research.service';
import { Research } from '../research/entities/research.entity';
import { BrandService } from '../brand/brand.service';
import { Brand } from '../brand/entities/brand.entity';
import { MicroSegment } from '../micro-segments/entities/micro-segment.entity';
import { UserService } from '../user/user.service';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { User } from '../user/entities/user.entity';
import { QuestionOptionsService } from '../question-options/question-options.service';
import { QuestionOption } from '../question-options/entities/question-option.entity';
import { Mtag } from '../mtags/entities/mtag.entity';
import PeopleGenre from '../user/entities/people-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, QuestionType,PeopleGenre, QuestionOption, Research, Brand, MicroSegment, User, Mtag])],
  providers: [QuestionResolver, QuestionService, QuestionOptionsService, ResearchService, BrandService, UserService, CloudinaryService]
})
export class QuestionModule {}
