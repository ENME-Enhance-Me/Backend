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

@Module({
  imports: [TypeOrmModule.forFeature([User, Phone, Brand, Client])],
  providers: [UserResolver, UserService, PhoneService, BrandService, ClientsService],
})
export class UserModule {}
