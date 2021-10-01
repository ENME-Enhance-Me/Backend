import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardResolver } from './reward.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from './entities/reward.entity';
import { BrandService } from '../brand/brand.service';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { Brand } from '../brand/entities/brand.entity';
import { MicroSegment } from '../micro-segments/entities/micro-segment.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reward, Brand, MicroSegment, User])],
  providers: [RewardResolver, RewardService, BrandService, CloudinaryService, UserService]
})
export class RewardModule {}
