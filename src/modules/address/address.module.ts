import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressResolver } from './address.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Neighborhood } from './entities/neighborhood.entity';
import { City } from './entities/city.entity';
import { State } from './entities/state.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Address, Neighborhood, City, State])],
  providers: [AddressResolver, AddressService]
})
export class AddressModule {}
