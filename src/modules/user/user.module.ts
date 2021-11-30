import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from '../phone/entities/phone.entity';
import { PhoneService } from '../phone/phone.service';
import { Brand } from '../brand/entities/brand.entity';
import { Client } from '../clients/entities/client.entity';
import { BrandService } from '../brand/brand.service';
import { ClientsService } from '../clients/clients.service';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { MicroSegment } from '../micro-segments/entities/micro-segment.entity';
import { PeopleGenreService } from './peopleGenre.service';
import PeopleGenre from './entities/people-genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, User, Phone, Client, MicroSegment, PeopleGenre])],
  providers: [UserResolver, UserService, BrandService, PhoneService,  ClientsService, CloudinaryService, PeopleGenreService],
})
export class UserModule {}
