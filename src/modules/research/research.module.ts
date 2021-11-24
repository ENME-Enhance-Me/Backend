import { Module } from '@nestjs/common';
import { ResearchService } from './research.service';
import { ResearchResolver } from './research.resolver';
import { BrandService } from '../brand/brand.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Research } from './entities/research.entity';
import { Brand } from '../brand/entities/brand.entity';
import { MicroSegment } from '../micro-segments/entities/micro-segment.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { ClientsService } from '../clients/clients.service';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { Client } from '../clients/entities/client.entity';
import { QuestionService } from '../question/question.service';
import { Question } from '../question/entities/question.entity';
import { QuestionType } from '../question/entities/question-type.entity';
import { CreateResearchService } from './research-create.service';
import { QuestionOptionsService } from '../question-options/question-options.service';
import { MtagsService } from '../mtags/mtags.service';
import { QuestionOption } from '../question-options/entities/question-option.entity';
import { Mtag } from '../mtags/entities/mtag.entity';
import { RewardService } from '../reward/reward.service';
import { Reward } from '../reward/entities/reward.entity';
import PeopleGroup from '../user/entities/people-group.entity';
import { PeopleGroupService } from '../user/peopleGroup.service';

@Module({
  imports: [TypeOrmModule.forFeature([Research, PeopleGroup, Reward, Brand, MicroSegment, User, Client, Question, QuestionOption, Mtag, QuestionType])],
  providers: [ResearchResolver, ResearchService, CreateResearchService, PeopleGroupService, QuestionOptionsService, QuestionService, BrandService, MtagsService, RewardService, UserService, ClientsService, CloudinaryService]
})
export class ResearchModule {}
