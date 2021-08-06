import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandResolver } from './brand.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/entities/user.entity';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { AddressService } from '../address/address.service';
import { Address } from '../address/entities/address.entity';
import { Neighborhood } from '../address/entities/neighborhood.entity';
import { City } from '../address/entities/city.entity';
import { State } from '../address/entities/state.entity';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../clients/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, User, Address, Neighborhood, City, State, Client])],
  providers: [BrandResolver, BrandService, UserService, CloudinaryService, AddressService, ClientsService],
})
export class BrandModule {}
