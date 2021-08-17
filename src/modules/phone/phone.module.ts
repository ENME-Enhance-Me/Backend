import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneResolver } from './phone.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Brand } from '../brand/entities/brand.entity';
import { Client } from '../clients/entities/client.entity';
import { BrandService } from '../brand/brand.service';
import { ClientsService } from '../clients/clients.service';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { MicroSegment } from '../micro-segments/entities/micro-segment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Phone, Brand, Client, MicroSegment])],
  providers: [PhoneResolver, PhoneService, UserService, BrandService, ClientsService, CloudinaryService]
})
export class PhoneModule {}
