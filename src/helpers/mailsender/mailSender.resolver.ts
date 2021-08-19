import { Query, Resolver } from '@nestjs/graphql';
import { MailSenderService } from './mailSender.service';

@Resolver()
export class MailSenderResolver {
    constructor(
        private readonly mailSenderService: MailSenderService
    ){}

    @Query(() => String)
    async sendEmail(){
        const envio = await this.mailSenderService.example();
        return envio;
    } 
}
