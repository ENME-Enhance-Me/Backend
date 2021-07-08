import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from '../phone/entities/phone.entity';
import { PhoneService } from '../phone/phone.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Phone])],
  providers: [UserResolver, UserService, PhoneService],
})
export class UserModule {}
