import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserInput } from 'src/user/dto/create-user.input';

@InputType()
export class CreateBrandInput extends CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  Company_name: string;

  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  CNPJ_CPF: string;
}
