import { CreateClientInput } from './create-client.input';
import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { FindUserInput } from 'src/modules/user/dto/find-user.input';

@InputType()
export class FindClientInput extends FindUserInput {
  
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  clientID?: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  lastname?: string;

}
