import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class FindUserInput {
    @IsString()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
    @IsOptional()
    UserId?: string;

    @IsString()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
    @IsOptional()
    UserName?: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
    @IsOptional()
    Email?: string;
}
