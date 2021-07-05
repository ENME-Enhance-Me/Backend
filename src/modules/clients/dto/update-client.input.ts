import { CreateClientInput } from './create-client.input';
import { InputType, Field } from '@nestjs/graphql';
import { UpdateUserInput } from 'src/modules/user/dto/update-user.input';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateClientInput extends UpdateUserInput {
  
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  lastname?: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
  @IsOptional()
  gender?: string;

  @IsDate()
  @IsNotEmpty({ message: 'Campo  data de nascimento não pode estar vazio' })
  @IsOptional()
  birthdate?: Date;

  @IsNumber()
  @IsNotEmpty({ message: 'Campo Reputação não pode estar vazio' })
  @IsOptional()
  reputation?: number;
}
