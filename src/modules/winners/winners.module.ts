import { Module } from '@nestjs/common';
import { WinnersService } from './winners.service';
import { WinnersResolver } from './winners.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Winner } from './entities/winner.entity';
import { ClientbrandService } from '../clientbrand/clientbrand.service';
import { RewardService } from '../reward/reward.service';
import { ClientsService } from '../clients/clients.service';
import { Clientbrand } from '../clientbrand/entities/clientbrand.entity';
import { BrandService } from '../brand/brand.service';
import { Reward } from '../reward/entities/reward.entity';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { Client } from '../clients/entities/client.entity';
import { UserService } from '../user/user.service';
import { Brand } from '../brand/entities/brand.entity';
import { MicroSegment } from '../micro-segments/entities/micro-segment.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Winner, Clientbrand, Reward, Client, Brand, MicroSegment, User])],
  providers: [WinnersResolver, WinnersService, ClientbrandService, RewardService, ClientsService, BrandService, CloudinaryService, UserService]
})
export class WinnersModule {}
