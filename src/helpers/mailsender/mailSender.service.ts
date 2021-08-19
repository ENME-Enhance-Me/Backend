import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailSenderService {
    constructor(private readonly mailerService: MailerService) { }

    public async example(company_name: string, username: string, email: string ): Promise<string> {
        const retorno = await this.mailerService.sendMail({
            to: email, // List of receivers email address
            subject: 'Envio de email para esqueci a senha',
            template: './index', // The `.pug` or `.hbs` extension is appended automatically.
            context: {  // Data to be sent to template engine.
              marca: company_name,
              username: username,
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
