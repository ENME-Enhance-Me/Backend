import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneResolver } from './phone.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Phone])],
  providers: [PhoneResolver, PhoneService, UserService]
})
export class PhoneModule {}
