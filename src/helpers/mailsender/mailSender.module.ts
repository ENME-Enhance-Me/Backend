import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailSenderResolver } from './mailSender.resolver';
import { MailSenderService } from './mailSender.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: process.env.EMAIL_ID,
                        pass: process.env.EMAIL_PASS
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
            })
        }),
    ],
    providers: [MailSenderResolver, MailSenderService]
})
export class MailSenderModule { }
