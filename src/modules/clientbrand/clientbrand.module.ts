import { Module } from '@nestjs/common';
import { ClientbrandService } from './clientbrand.service';
import { ClientbrandResolver } from './clientbrand.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clientbrand } from './entities/clientbrand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clientbrand])],
  providers: [ClientbrandResolver, ClientbrandService]
})
export class ClientbrandModule {}
