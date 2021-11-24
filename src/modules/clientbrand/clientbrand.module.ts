import { Module } from '@nestjs/common';
import { ClientbrandService } from './clientbrand.service';
import { ClientbrandResolver } from './clientbrand.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clientbrand } from './entities/clientbrand.entity';
import { Client } from '../clients/entities/client.entity';
import { ClientsService } from '../clients/clients.service';
import { Brand } from '../brand/entities/brand.entity';
import { BrandService } from '../brand/brand.service';
import { UserService } from '../user/user.service';
import { MicroSegment } from '../micro-segments/entities/micro-segment.entity';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clientbrand, Client, Brand, MicroSegment, User])],
  providers: [ClientbrandResolver, ClientbrandService, ClientsService, BrandService, UserService, CloudinaryService]
})
export class ClientbrandModule {}
