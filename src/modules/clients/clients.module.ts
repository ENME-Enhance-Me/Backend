import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsResolver } from './clients.resolver';
import { Client } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client, User])],
  providers: [ClientsResolver, ClientsService, UserService, CloudinaryService]
})
export class ClientsModule {}
