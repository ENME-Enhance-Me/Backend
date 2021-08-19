import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailSenderService {
    constructor(private readonly mailerService: MailerService) { }

    public async example(): Promise<string> {
        const retorno = await this.mailerService.sendMail({
            to: 'jp.john159@gmail.com', // List of receivers email address
            from: 'sandrine.connelly25@ethereal.email', // Senders email address
            subject: 'Testing Nest Mailermodule with template ✔',
            template: './index', // The `.pug` or `.hbs` extension is appended automatically.
            context: {  // Data to be sent to template engine.
              code: 'cf1a3f828287',
              username: 'john doe',
            },
        }).then((success) => {
            console.log(success)
            return 'enviado'
        }).catch((err) => {
            console.log(err)
            return 'erro'
        });
        return retorno;
    }
}
