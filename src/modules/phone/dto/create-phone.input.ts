import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';

@InputType()
export class CreatePhoneInput {

  @IsNumber()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  DDD: number;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  number: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  userID: string;
}
