import { Module } from '@nestjs/common';
import { ClientbrandService } from './clientbrand.service';
import { ClientbrandResolver } from './clientbrand.resolver';

@Module({
  providers: [ClientbrandResolver, ClientbrandService]
})
export class ClientbrandModule {}
