import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '../answer/entities/answer.entity';
import { AnswerService } from '../answer/answer.service';
import { Comment } from './entities/comment.entity';
import { UserService } from '../user/user.service';
import { BrandService } from '../brand/brand.service';
import { ResearchService } from '../research/research.service';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { QuestionService } from '../question/question.service';
import { QuestionOptionsService } from '../question-options/question-options.service';
import { User } from '../user/entities/user.entity';
import { MicroSegment } from '../micro-segments/entities/micro-segment.entity';
import { Brand } from '../brand/entities/brand.entity';
import { Research } from '../research/entities/research.entity';
import { QuestionOption } from '../question-options/entities/question-option.entity';
import { Question } from '../question/entities/question.entity';
import { QuestionType } from '../question/entities/question-type.entity';
import { Mtag } from '../mtags/entities/mtag.entity';
import { ClientbrandService } from '../clientbrand/clientbrand.service';
import { Clientbrand } from '../clientbrand/entities/clientbrand.entity';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../clients/entities/client.entity';
import PeopleGenre from '../user/entities/people-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Mtag, Answer, Question, QuestionType, QuestionOption, Research, Brand, MicroSegment, User, Clientbrand, Client, PeopleGenre])],
  providers: [CommentsResolver, CommentsService, AnswerService, QuestionOptionsService, QuestionService, CloudinaryService, ResearchService, BrandService, UserService, ClientbrandService, ClientsService]
})
export class CommentsModule { }
