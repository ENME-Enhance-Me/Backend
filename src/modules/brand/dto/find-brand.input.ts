import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FindUserInput } from 'src/modules/user/dto/find-user.input';

@InputType()
export class FindBrandInput extends FindUserInput {

    @IsString()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
    @IsOptional()
    brandID?: string;
    
    @IsString()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
    @IsOptional()
    Company_name?: string;

    @IsString()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
    @IsOptional()
    CNPJ_CPF?: string;
}
