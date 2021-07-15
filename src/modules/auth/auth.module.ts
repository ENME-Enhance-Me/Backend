import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { BrandService } from '../brand/brand.service';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../clients/entities/client.entity';
import { Brand } from '../brand/entities/brand.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Brand, Client, User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '5h'
        },
      })
    })],
  providers: [AuthResolver, AuthService, BrandService, ClientsService, UserService, JwtStrategy, CloudinaryService]
})
export class AuthModule { }
