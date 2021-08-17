import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressResolver } from './address.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Neighborhood } from './entities/neighborhood.entity';
import { City } from './entities/city.entity';
import { State } from './entities/state.entity';
import { BrandService } from '../brand/brand.service';
import { ClientsService } from '../clients/clients.service';
import { Brand } from '../brand/entities/brand.entity';
import { User } from '../user/entities/user.entity';
import { Client } from '../clients/entities/client.entity';
import { Phone } from '../phone/entities/phone.entity';
import { UserService } from '../user/user.service';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { MicroSegment } from '../micro-segments/entities/micro-segment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Address, Neighborhood, City, State, Brand, User, Phone, Client, MicroSegment])],
  providers: [AddressResolver, AddressService, BrandService, UserService, CloudinaryService, ClientsService]
})
export class AddressModule {}
