/* eslint-disable prettier/prettier */
import "reflect-metadata";
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { BrandModule } from './modules/brand/brand.module';
import { ClientsModule } from './modules/clients/clients.module';
import { AuthModule } from './modules/auth/auth.module';
import { PhoneModule } from './modules/phone/phone.module';
import { FileModule } from './shared/file/file.module';
import { Cloudinary } from './helpers/Cloudinary/cloudinary';
import { CloudinaryModule } from './helpers/Cloudinary/cloudinary.module';
import { AddressModule } from './modules/address/address.module';
import { MicroSegmentsModule } from './modules/micro-segments/micro-segments.module';
import { MacroSegmentsModule } from './modules/macro-segments/macro-segments.module';
import { MailSenderResolver } from './helpers/mailsender/mailSender.resolver';
import { MailSenderService } from "./helpers/mailsender/mailSender.service";
import { MailSenderModule } from './helpers/mailsender/mailSender.module';
import { ResearchModule } from './modules/research/research.module';
import { QuestionModule } from './modules/question/question.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: join(process.cwd(), 'dist/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
      uploads: false
    }),
    UserModule,
    BrandModule,
    ClientsModule,
    AuthModule,
    PhoneModule,
    FileModule,
    CloudinaryModule,
    AddressModule,
    MicroSegmentsModule,
    MacroSegmentsModule,
    MailSenderModule,
    ResearchModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService, Cloudinary],
})
export class AppModule {
}
