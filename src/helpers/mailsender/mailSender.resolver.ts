import { Args, Query, Resolver } from '@nestjs/graphql';
import { MailSenderService } from './mailSender.service';

@Resolver()
export class MailSenderResolver {
    constructor(
        private readonly mailSenderService: MailSenderService
    ){}

    @Query(() => String)
    async sendEmail(
        @Args('Company_name') company_name: string,
        @Args('username') username: string,
        @Args('email') email: string
    ){
        const envio = await this.mailSenderService.example(company_name, username, email);
        return envio;
    } 
}
