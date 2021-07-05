import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class FindUserInput {
    @IsString()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
    @IsOptional()
    userID?: string;

    @IsString()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
    @IsOptional()
    username?: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
    @IsOptional()
    email?: string;
}
