import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailSenderResolver } from './mailSender.resolver';
import { MailSenderService } from './mailSender.service';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'sandrine.connelly25@ethereal.email',
                    pass: '1H7JsYptt86f3rzaFH'
                }
            },
            defaults: {
                from: '"No Reply" <noreply@example.com>',
            },
            template: {
                dir: process.cwd() + '/template/',
                adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailSenderResolver, MailSenderService]
})
export class MailSenderModule { }
