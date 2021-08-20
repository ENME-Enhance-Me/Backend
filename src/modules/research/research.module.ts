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

@Module({
  imports: [TypeOrmModule.forFeature([Research, Brand, MicroSegment, User, Client])],
  providers: [ResearchResolver, ResearchService, BrandService, UserService, ClientsService, CloudinaryService]
})
export class ResearchModule {}
