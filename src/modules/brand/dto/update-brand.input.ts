import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UpdateUserInput } from 'src/modules/user/dto/update-user.input';

@InputType()
export class UpdateBrandInput {
  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  @IsOptional()
  company_name?: string;

  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  @IsOptional()
  CNPJ_CPF?: string;
}
