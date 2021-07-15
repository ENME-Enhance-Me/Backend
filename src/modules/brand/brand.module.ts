import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandResolver } from './brand.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/entities/user.entity';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, User])],
  providers: [BrandResolver, BrandService, UserService, CloudinaryService],
})
export class BrandModule {}
