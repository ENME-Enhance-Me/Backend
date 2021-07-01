import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateUserInput } from 'src/modules/user/dto/create-user.input';

@InputType()
export class CreateClientInput extends CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  FirstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  LastName: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
  Gender: string;

  @IsDate()
  @IsNotEmpty({ message: 'Campo  data de nascimento não pode estar vazio' })
  BirthDate: Date;

}
