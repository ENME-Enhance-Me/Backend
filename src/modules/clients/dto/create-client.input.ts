import { InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateUserInput } from 'src/modules/user/dto/create-user.input';
import { gender } from '../entities/client.entity';

@InputType()
export class CreateClientInput extends CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  firstname: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  lastname: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
  gender: gender;

  @IsDate()
  @IsNotEmpty({ message: 'Campo  data de nascimento não pode estar vazio' })
  birthdate: Date;

}
